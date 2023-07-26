const {
  ACTIVITY,
  COACHING_MODE,
  COACHING_QUESTION_STATUS,
  COMPANY_ACTIVITY,
  COMPANY_ACTIVITY_SERVICES_AUX_ENTREPRISES,
  CONTENTS_TYPE,
  DAYS,
  DIET_REGISTRATION_STATUS,
  ECOSCORE,
  EVENT_TYPE,
  EVENT_WEBINAR,
  FOOD_DOCUMENT_TYPE,
  GENDER,
  GROUPS_CREDIT,
  HARDNESS,
  HOME_STATUS,
  NUTRISCORE,
  PARTICULAR_COMPANY_NAME,
  PERIOD,
  QUIZZ_QUESTION_TYPE,
  QUIZZ_TYPE,
  ROLES,
  ROLE_CUSTOMER,
  ROLE_EXTERNAL_DIET,
  ROLE_RH,
  SEASON,
  SPOON_SOURCE,
  SURVEY_ANSWER,
  TARGET_TYPE,
  UNIT
} = require('./consts')
const { BadRequestError, ForbiddenError } = require('../../utils/errors')
const SpoonGain = require('../../models/SpoonGain')

const {
  declareComputedField,
  declareEnumField,
  declareVirtualField,
  getModel,
  idEqual,
  loadFromDb,
  setFilterDataUser,
  setIntersects,
  setPostCreateData,
  setPreCreateData,
  setPreprocessGet,
  simpleCloneModel,
} = require('../../utils/database')
const CoachingQuestion = require('../../models/CoachingQuestion')
const CollectiveChallenge = require('../../models/CollectiveChallenge')
const Pip = require('../../models/Pip')
const ChallengeUserPip = require('../../models/ChallengeUserPip')
const ChallengeUserPipSchema = require('./schemas/ChallengeUserPipSchema')
const ChallengePip = require('../../models/ChallengePip')
const {
  getUserIndChallengeTrophy,
  getUserKeyProgress,
  getUserKeySpoons,
  getUserKeyTrophy,
  getUserKeyReadContents,
  getUserSpoons
} = require('./spoons')
const mongoose = require('mongoose')
require('lodash.product')
const lodash=require('lodash')
const moment = require('moment')
const UserSurvey = require('../../models/UserSurvey')
const {CREATED_AT_ATTRIBUTE} = require('../../../utils/consts')
const Offer = require('../../models/Offer')
const Content = require('../../models/Content')
const Company = require('../../models/Company')
const User = require('../../models/User')
const Team = require('../../models/Team')
const TeamMember = require('../../models/TeamMember')
const Coaching = require('../../models/Coaching')

const filterDataUser = ({model, data, id, user}) => {
  if (model=='offer' && !id) {
    return Offer.find({company: null})
      .then(offers => data.filter(d => offers.some(o => idEqual(d._id, o._id))))
  }
  if (model=='user' && user.role==ROLE_RH) {
    console.log(`I am RH`)
    data=data.filter(u => idEqual(id, user._id) || (user.company && idEqual(u.company?._id, user.company?._id)))
  }
  data=lodash.sortBy(data, ['order', 'fullname', 'name', 'label'])
  return Promise.resolve(data)
}

setFilterDataUser(filterDataUser)

const preprocessGet = ({model, fields, id, user, params}) => {
  console.log(`preProcessGet:${JSON.stringify(params)}`)
  if (model=='loggedUser') {
    model='user'
    id = user?._id || 'INVALIDID'
  }
  if (model=='user') {
    fields.push('company')
  }
  if (model=='adminDashboard') {
    return computeStatistics({id, fields})
      .then(stats => ({model, fields, id, data:[stats]}))
  }
  if (model=='menu' && params?.people_count) {
    return loadFromDb({model:'menu', id, fields:[...(fields||[]), 'people_count']})
      .then(menus => {
        const people_count=parseInt(params.people_count)
        const ratio=people_count/2
        const computed=menus.map(m => {
          return {
            ...m,
            people_count,
            shopping_list: m.shopping_list.map(i => ({...i, quantity: i.quantity*ratio})),
            recipes: m.recipes.map(recipe => ({
              ...recipe,
              recipe: {
                ...recipe.recipe,
                ingredients: recipe.recipe.ingredients.map(ing => ({
                  ...ing,
                  quantity: ing.quantity*ratio,
                }))
              }
            }))
          }
        })
        return ({model, fields, id, data:computed})
      })
  }
  return Promise.resolve({model, fields, id})

}

setPreprocessGet(preprocessGet)

const preCreate = ({model, params, user}) => {
  if (['comment', 'measure', 'content', 'collectiveChallenge', 'individualChallenge', 'webinar', 'menu'].includes(model)) {
    params.user=user
  }
  if (['message'].includes(model)) {
    params.sender=user
  }
  if (['team'].includes(model)) {
    return Team.findOne({name: params.name?.trim(), collectiveChallenge: params.collectiveChallenge}).populate('collectiveChallenge')
      .then(team => {
        if (team) { throw new BadRequestError(`L'équipe ${params.name} existe déjà pour ce challenge`)}
        return CollectiveChallenge.findById(params.collectiveChallenge)
      })
      .then(challenge => {
        if (!challenge) { throw new BadRequestError(`Le challenge ${params.collectiveChallenge} n'existe pas`)}
        if (moment().isAfter(moment(challenge.start_date))) { throw new BadRequestError(`Le challenge a déjà démarré`)}
        return {model, params}
      })
  }
  if (model=='quizzQuestion') {
    if (user.role!=ROLE_EXTERNAL_DIET) {
      throw new ForbiddenError(`Seule une diététicienne externe peut créer des objectifs`)
    }
    params.diet_private=user
  }
  return Promise.resolve({model, params})
}

setPreCreateData(preCreate)


const USER_MODELS=['user', 'loggedUser']
USER_MODELS.forEach(m => {
  declareVirtualField({model: m, field: 'fullname', instance: 'String', requires: 'firstname,lastname'})
  declareVirtualField({model: m, field: 'password2', instance: 'String'})
  declareEnumField({model: m, field: 'home_status', enumValues: HOME_STATUS})
  declareEnumField({model: m, field: 'role', enumValues: ROLES})
  declareEnumField({model: m, field: 'gender', enumValues: GENDER})
  declareEnumField({model: m, field: 'activity', enumValues: ACTIVITY})
  declareVirtualField({model: m, field: 'spoons_count', instance: 'Number'})
  declareVirtualField({model: m, field: '_all_contents', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'content'}},
  })
  declareVirtualField({model: m, field: 'contents', instance: 'Array',
  requires: '_all_contents.comments_count,_all_targets,targets,_all_contents.targets,objective_targets,health_targets,activity_target,specificity_targets,home_target,_all_contents.search_text,_all_contents.key',
  multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'content'}},
  })
  declareVirtualField({model: m, field: 'webinars', instance: 'Array',
    requires: 'company,company.webinars,skipped_events,passed_events', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'webinar'}},
  })
  declareVirtualField({model: m, field: 'available_webinars', instance: 'Array',
    requires: 'webinars', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'webinar'}},
  })
  declareVirtualField({model: m, field: 'past_webinars', instance: 'Array',
    requires: '_all_webinars', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'webinar'}},
  })
  declareVirtualField({model: m, field: '_all_events', instance: 'Array',
    requires: '_all_menus,_all_individual_challenges,collective_challenges,_all_webinars',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'webinar'}},
  })
  declareVirtualField({model: m, field: '_all_webinars', instance: 'Array',
    requires: 'company.webinars', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'webinar'}},
  })
  declareVirtualField({model: m, field: '_all_individual_challenges', instance: 'Array', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'individualChallenge'}},
  })
  declareVirtualField({model: m, field: 'individual_challenges', instance: 'Array',
    requires: '_all_individual_challenges.key,skipped_events,passed_events,routine_events,registered_events.type,_all_individual_challenges.type,failed_events,current_individual_challenge',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'individualChallenge'}},
  })
  declareVirtualField({model: m, field: 'passed_individual_challenges', instance: 'Array',
    requires: '_all_individual_challenges,passed_events', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'individualChallenge'}},
  })
  declareVirtualField({model: m, field: '_all_menus', instance: 'menu',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'menu'}},
  })
  declareVirtualField({model: m, field: 'available_menus', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'menu'}},
  })
  declareVirtualField({model: m, field: 'past_menus', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'menu'}},
  })
  declareVirtualField({model: m, field: 'collective_challenges', instance: 'Array', multiple: true,
    requires:'company,company.collective_challenges',
    caster: {
      instance: 'ObjectID',
      options: {ref: 'collectiveChallenge'}},
  })
  declareVirtualField({model: m, field: 'available_groups', instance: 'Array',
    requires: 'targets,company.groups,company.groups.targets,registered_groups,company.groups.key', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'group'}},
  })
  declareVirtualField({model: m, field: 'registered_groups', instance: 'Array', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'group'}},
  })
  declareVirtualField({model: m, field: 'measures', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'measure'}},
  })
  declareVirtualField({model: m, field: 'last_measures', instance: 'Array',
    requires: 'measures', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'measure'}},
  })
  declareVirtualField({model: m, field: 'pinned_contents', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'content'}},
  })
  declareVirtualField({model: m, field: '_all_targets', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'target'}},
  })
  declareVirtualField({model: m, field: 'targets', instance: 'Array',
    requires: '_all_targets.contents,objective_targets,health_targets,activity_target,specificity_targets,home_target',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'target'}},
  })
  declareVirtualField({model: m, field: 'current_individual_challenge', instance: 'individualChallenge',
    requires: 'registered_events,failed_events,passed_events',
    multiple: false,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'individualChallenge'}},
  })
  declareVirtualField({model: m, field: 'offer', instance: 'offer',
    requires: 'company.offers',
    multiple: false,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'offer'}},
  })
  declareVirtualField({model: m, field: 'surveys', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'userSurvey'}},
  })
  declareVirtualField({model: m, field: 'diploma', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'diploma'}},
  })
  declareEnumField({model: m, field: 'registration_status', enumValues: DIET_REGISTRATION_STATUS})
  declareVirtualField({model: m, field: 'diet_comments', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'dietComment'}},
  })
  declareVirtualField({model: m, field: 'diet_average_note', instance: 'Number',
    requires:'diet_comments._defined_notes'})
  declareVirtualField({model: m, field: 'profile_progress', instance: 'Number',
    requires:'diploma,adeli,siret,signed_charter'
  })
  declareVirtualField({model: m, field: 'diet_objectives', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'quizzQuestion'}},
  })
  declareVirtualField({model: m, field: 'coachings', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'coaching'}},
  })
  declareVirtualField({model: m, field: 'latest_coachings', instance: 'Array',
    requires: 'coachings.appointments.start_date,coachings.appointments.objectives,surveys,coachings.food_documents',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'coaching'}},
  })
  declareVirtualField({model: m, field: 'diet_questions', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'quizzQuestion'}},
  })
})

declareEnumField({model: 'company', field: 'activity', enumValues: COMPANY_ACTIVITY})
declareVirtualField({model: 'company', field: 'administrators', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'user'}},
})
declareVirtualField({model: 'company', field: 'webinars', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'webinar'}},
})
declareVirtualField({model: 'company', field: 'groups', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'group'}},
})
declareVirtualField({model: 'company', field: 'likes_count', instance: 'Number'})
declareVirtualField({model: 'company', field: 'comments_count', instance: 'Number'})
declareVirtualField({model: 'company', field: 'shares_count', instance: 'Number'})
declareVirtualField({model: 'company', field: 'contents_count', instance: 'Number'})
declareVirtualField({model: 'company', field: 'groups_count', instance: 'Number', requires: 'groups'})
declareVirtualField({model: 'company', field: 'children', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'company'}},
})
declareVirtualField({model: 'company', field: 'collective_challenges', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'collectiveChallenge'}},
})
declareVirtualField({model: 'company', field: 'offers', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'offer'}},
})
declareVirtualField({model: 'company', field: 'users', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'user'}},
})


declareEnumField({model: 'content', field: 'type', enumValues: CONTENTS_TYPE})
declareVirtualField({model: 'content', field: 'likes_count', instance: 'Number', requires: 'likes'})
declareVirtualField({model: 'content', field: 'shares_count', instance: 'Number', requires: 'shares'})
declareVirtualField({model: 'content', field: 'comments', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'comment'}},
})
declareVirtualField({model: 'content', field: 'liked', instance: 'Boolean', requires: 'likes'})
declareVirtualField({model: 'content', field: 'pinned', instance: 'Boolean', requires: 'pins'})
declareVirtualField({model: 'content', field: 'comments_count', instance: 'Number', requires: 'comments'})
declareVirtualField({model: 'content', field: 'search_text', instance: 'String', requires: 'name,contents'})

declareVirtualField({model: 'dietComment', field: '_defined_notes', instance: 'Number', multiple: 'true'})

const EVENT_MODELS=['event', 'collectiveChallenge', 'individualChallenge', 'menu', 'webinar']
EVENT_MODELS.forEach(m => {
  declareVirtualField({model: m, field: 'type', instance: 'String', enumValues: EVENT_TYPE})
  declareVirtualField({model: m, field: 'duration', instance: 'Number', required:'start_date,end_date'})
})

declareEnumField({model: 'individualChallenge', field: 'hardness', enumValues: HARDNESS})

declareVirtualField({model: 'individualChallenge', field: 'trophy_picture',
  instance: 'String', requires: 'trophy_on_picture,trophy_off_picture,spoons_count_for_trophy'})

declareEnumField({model: 'category', field: 'type', enumValues: TARGET_TYPE})
declareVirtualField({model: 'category', field: 'targets', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'target'}},
})

declareEnumField({model: 'spoonGain', field: 'source', enumValues: SPOON_SOURCE})

declareVirtualField({model: 'offer', field: 'company', instance: 'offer', multiple: false,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'company'}},
})

declareVirtualField({model: 'target', field: 'contents', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'content'}},
})
declareVirtualField({model: 'target', field: 'groups', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'group'}},
})
declareVirtualField({model: 'target', field: 'users', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'user'}},
})

declareEnumField({model: 'recipe', field: 'nutriscore', enumValues: NUTRISCORE})
declareEnumField({model: 'recipe', field: 'ecoscore', enumValues: ECOSCORE})
declareVirtualField({model: 'recipe', field: 'ingredients', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'recipeIngredient'}},
})
declareEnumField({model: 'recipe', field: 'season', enumValues: SEASON})

declareVirtualField({model: 'menu', field: 'recipes', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'menuRecipe'}},
})
declareVirtualField({model: 'menu', field: 'shopping_list', instance: 'Array',
  requires: 'recipes.recipe.ingredients.ingredient',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'recipeIngredient'}},
})
declareVirtualField({model: 'menu', field: 'people_count', instance: 'Number'})

declareEnumField({model: 'ingredient', field: 'unit', enumValues: UNIT})
declareVirtualField({model: 'ingredient', field: 'label', instance: 'String', requires: 'name,unit'})

declareVirtualField({model: 'group', field: 'messages', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'message'}},
})
declareVirtualField({model: 'group', field: 'pinned_messages', instance: 'Array',
  requires: 'messages.pins,messages.pinned', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'message'}},
})
declareVirtualField({model: 'group', field: 'users_count', instance: 'Number'})
declareVirtualField({model: 'group', field: 'messages_count', instance: 'Number', requires: 'messages'})

declareVirtualField({model: 'message', field: 'pinned', instance: 'Boolean', requires: 'pins'})
declareVirtualField({model: 'message', field: 'liked', instance: 'Boolean', requires: 'likes'})
declareVirtualField({model: 'message', field: 'likes_count', instance: 'Number', requires: 'likes'})

declareVirtualField({model: 'comment', field: 'children', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'comment'}},
})

declareVirtualField({model: 'key', field: 'trophy_picture', instance: 'String', requires: 'spoons_count_for_trophy,trophy_on_picture,trophy_off_picture'})
declareVirtualField({model: 'key', field: 'user_spoons', instance: 'Number'})
declareVirtualField({model: 'key', field: 'user_spoons_str', instance: 'String'})
declareVirtualField({model: 'key', field: 'user_progress', instance: 'Number'})
declareVirtualField({model: 'key', field: 'user_read_contents', instance: 'Number'})
declareVirtualField({model: 'key', field: 'user_surveys_progress', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'chartPoint'}},
})
declareVirtualField({model: 'key', field: 'user_passed_challenges', instance: 'Number', required: 'passed_events'})
declareVirtualField({model: 'key', field: 'user_passed_webinars', instance: 'Number', required: 'passed_events'})


declareVirtualField({model: 'userSurvey', field: 'questions', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'userQuestion'}},
})

declareEnumField({model: 'userQuestion', field: 'answer', enumValues: SURVEY_ANSWER})

declareEnumField({model: 'menuRecipe', field: 'day', enumValues: DAYS})
declareEnumField({model: 'menuRecipe', field: 'period', enumValues: PERIOD})

declareVirtualField({model: 'userQuestion', field: 'index', instance: 'Number', requires:'survey.questions'})
declareVirtualField({model: 'userQuestion', field: 'total', instance: 'Number', requires:'survey.questions'})

declareVirtualField({model: 'pip', field: 'comments', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'comment'}},
})
declareVirtualField({model: 'pip', field: 'comments_count', instance: 'Number', requires: 'comments'})

declareVirtualField({model: 'team', field: 'members', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'teamMember'}},
})
declareVirtualField({model: 'team', field: 'spoons_count', instance: 'Number', requires: 'members.pips.valid'})

declareVirtualField({model: 'teamMember', field: 'spoons', instance: 'Number'})
declareVirtualField({model: 'teamMember', field: 'pips', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'challengeUserPip'}},
})

declareVirtualField({model: 'collectiveChallenge', field: 'teams', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'team'}},
})

declareVirtualField({model: 'collectiveChallenge', field: 'pips', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'challengePip'}},
})

declareVirtualField({model: 'challengePip', field: 'userPips', instance: 'Array', multiple: true,
  requires: 'userPips.valid,pip.spoons',
  caster: {
    instance: 'ObjectID',
    options: {ref: 'challengeUserPip'}},
})
declareVirtualField({model: 'challengePip', field: 'spoons', instance: 'Number'})
declareVirtualField({model: 'challengePip', field: 'pendingUserPips', instance: 'Array', multiple: true,
  requires: 'userPips.proof,userPips.valid',
  caster: {
    instance: 'ObjectID',
    options: {ref: 'challengeUserPip'}},
})

declareVirtualField({model: 'coaching', field: 'appointments', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'appointment'}},
})
declareVirtualField({model: 'coaching', field: 'remaining_credits', instance: 'Number',
  requires: 'user.offer.coaching_credit,spent_credits'}
)
declareVirtualField({model: 'coaching', field: 'spent_credits', instance: 'Number', requires: 'appointments'})
declareVirtualField({model: 'coaching', field: 'questions', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'userCoachingQuestion'}},
})
declareEnumField({model: 'coaching', field: 'mode', instance: 'String', enumValues: COACHING_MODE})
declareVirtualField({model: 'coaching', field: '_all_diets', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'user'}},
})
declareVirtualField({model: 'coaching', field: 'available_diets', instance: 'Array', multiple: true,
  requires: '_all_diets.reasons',
  caster: {
    instance: 'ObjectID',
    options: {ref: 'user'}
  },
})
declareVirtualField({model: 'coaching', field: 'current_objectives', instance: 'Array', multiple: true,
  requires: 'appointments.objectives',
  caster: {
    instance: 'ObjectID',
    options: {ref: 'quizzQuestion'}
  },
})

declareEnumField({model: 'userCoachingQuestion', field: 'status', enumValues: COACHING_QUESTION_STATUS})

declareVirtualField({model: 'adminDashboard', field: 'company', instance: 'company', multiple: false,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'company'}},
})
declareVirtualField({model: 'adminDashboard', field:'webinars_count', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field:'average_webinar_registar', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field:'webinars_replayed_count', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field:'groups_count', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field:'group_active_members_count', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field:'average_group_answers', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field:'messages_count', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field:'users_count', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field:'active_users_count', instance: 'Number'})

declareEnumField({model: 'foodDocument', field: 'type', enumValues: FOOD_DOCUMENT_TYPE})

declareVirtualField({model: 'quizz', field: 'questions', instance: 'company', multiple: false,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'quizzQuestion'}},
})
declareEnumField({model: 'quizz', field: 'type', enumValues: QUIZZ_TYPE})

declareEnumField({model: 'quizzQuestion', field: 'type', enumValues: QUIZZ_QUESTION_TYPE})

declareVirtualField({model: 'userQuizz', field: 'answers', instance: 'company', multiple: false,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'quizzAnswer'}},
})

declareVirtualField({model: 'appointment', field:'order', instance: 'Number',
  requires: 'coaching.appointments',
})

const getDataLiked = (user, params, data) => {
  const liked=data?.likes?.some(l => idEqual(l._id, user?._id))
  return Promise.resolve(liked)
}

const setDataLiked= ({id, attribute, value, user}) => {
  console.log(`Liking:${value}`)
  return getModel(id, ['comment', 'message', 'content'])
    .then(model => {
      if (value) {
        // Set liked
        return mongoose.models[model].findByIdAndUpdate(id, {$addToSet: {likes: user._id}})
      }

      // Remove liked
      return mongoose.models[model].findByIdAndUpdate(id, {$pullAll: {likes: [user._id]}})

    })
}

const getDataPinned = (user, params, data) => {
  const pinned=data?.pins?.some(l => idEqual(l._id, user._id))
  return Promise.resolve(pinned)
}

const setDataPinned = ({id, attribute, value, user}) => {
  console.log(`Pinnning:${value}`)
  return getModel(id, ['message', 'content'])
    .then(model => {
      if (value) {
        // Set liked
        return mongoose.models[model].findByIdAndUpdate(id, {$addToSet: {pins: user._id}})
      }

      // Remove liked
      return mongoose.models[model].findByIdAndUpdate(id, {$pullAll: {pins: [user._id]}})

    })
}

const getPinnedMessages = (user, params, data) => {
  return Promise.resolve(data.messages?.filter(m => m.pins?.some(p => idEqual(p._id, user._id))))
}

const getMenuShoppingList = (user, params, data) => {
  const ingredients=lodash.flatten(data?.recipes.map(r => r.recipe?.ingredients).filter(v => !!v))
  const ingredientsGroup=lodash.groupBy(ingredients, i => i.ingredient._id)
  const result=lodash(ingredientsGroup)
    .mapValues(ingrs=>({ingredient:ingrs[0].ingredient, quantity: lodash.sumBy(ingrs, 'quantity')}))
    .values()
    .value()
  return Promise.resolve(result)
}

const getUserKeySpoonsStr = (user, params, data) => {
  return getUserKeySpoons(user, params, data)
    .then(count => {
      return  `${count} cuillère${count > 1 ? 's' :''}`
    })
}

const getUserSurveysProgress = (user, params, data) => {
  // Get max possible answer
  const maxAnswer=lodash.maxBy(Object.keys(SURVEY_ANSWER), v => parseInt(v))
  return UserSurvey.find({user: user})
    .sort({[CREATED_AT_ATTRIBUTE]: -1})
    .populate({path: 'questions', populate:{path: 'question'}})
    .lean({virtuals: true})
    // Keep surveys questions depending on current ky (==data)
    // TODO: try to filter in populate section above
    .then(surveys => surveys.map(s => ({...s, questions: s.questions.filter(q => idEqual(q.question.key, data._id))})))
    // Keep surveys having still questions
    .then(surveys => surveys.filter(s => !lodash.isEmpty(s.questions)))
    // Keep questions progress
    .then(surveys => surveys.map(s => ({
        date: s[CREATED_AT_ATTRIBUTE],
        value_1: (lodash.sumBy(s.questions, q => parseInt(q.answer)||0)*100.0/(s.questions.length*maxAnswer)),
      })))
    .catch(err => console.error(err))
}

const getUserContents = (user, params, data) => {
  const user_targets=lodash([data.objective_targets,data.health_targets,
    data.activity_target,data.specificity_targets,data.home_target])
    .flatten()
    .value()
  return Promise.resolve(data._all_contents.filter(c => c.default || setIntersects(c.targets, user_targets)))
}

const getUserPassedChallenges = (user, params, data) => {
  return User.findById(user._id, 'passed_events')
    .populate({path: 'passed_events', match:{"__t": "individualChallenge", key: data._id}})
    .then(res => {
      return res.passed_events?.length || 0
    })
}

const getUserPassedWebinars = (user, params, data) => {
  return User.findById(user._id, 'passed_events')
    .populate({path: 'passed_events', match:{"__t": "webinar", key: data._id}})
    .then(res => {
      return res.passed_events?.length || 0
    })
}

declareComputedField('user', 'contents', getUserContents)
declareComputedField('loggedUser', 'contents', getUserContents)
declareComputedField('comment', 'liked', getDataLiked, setDataLiked)
declareComputedField('message', 'liked', getDataLiked, setDataLiked)
declareComputedField('content', 'liked', getDataLiked, setDataLiked)
declareComputedField('message', 'pinned', getDataPinned, setDataPinned)
declareComputedField('content', 'pinned', getDataPinned, setDataPinned)
declareComputedField('group', 'pinned_messages', getPinnedMessages)
declareComputedField('individualChallenge', 'trophy_picture', getUserIndChallengeTrophy)
declareComputedField('key', 'trophy_picture', getUserKeyTrophy)
declareComputedField('key', 'user_spoons', getUserKeySpoons)
declareComputedField('key', 'user_spoons_str', getUserKeySpoonsStr)
declareComputedField('key', 'user_progress', getUserKeyProgress)
declareComputedField('key', 'user_read_contents', getUserKeyReadContents)
declareComputedField('key', 'user_passed_challenges', getUserPassedChallenges)
declareComputedField('key', 'user_passed_webinars', getUserPassedWebinars)
declareComputedField('user', 'spoons_count', getUserSpoons)
declareComputedField('loggedUser', 'spoons_count', getUserSpoons)
declareComputedField('menu', 'shopping_list', getMenuShoppingList)
declareComputedField('key', 'user_surveys_progress', getUserSurveysProgress)


const postCreate = ({model, params, data,user}) => {
  // Create company => duplicate offer
  if (model=='company') {
    return Offer.findById(params.offer)
      .then(offer => Offer.create( {...simpleCloneModel(offer), company: data._id}))
      .then(offer => data)
  }
  if (model=='booking') {
    console.log(`Sending mail to ${data.booking_user.email} and admins for booking ${data._id}`)
    sendNewBookingToMember({booking: data})
    User.find({role: FUMOIR_MANAGER})
      .then(managers => Promise.allSettled(managers.map(manager => sendNewBookingToManager({booking: data, manager}))))
  }
  if (model=='collectiveChallenge') {
    return Pip.find()
      .then (pips => Promise.all(pips.map(p => ChallengePip.create({pip:p, collectiveChallenge:data}))))
      .then(()=> {
        ensureChallengePipsConsistency()
        return data
      })
  }
  if (model=='pip') {
    ensureChallengePipsConsistency()
  }
  if (model=='teamMember') {
    ensureChallengePipsConsistency()
  }
  if (model=='coaching') {
    return CoachingQuestion.find()
      .then(questions => Promise.all(questions.map(question => userCoachingQuestion.create({coaching: data, question}))))
  }

  if (['loggedUser', 'user'].includes(model) && data.role==ROLE_CUSTOMER) {
    return Coaching.create({user: data})
      .then(coaching => User.findByIdAndUpdate(data._id, {coaching}))
  }

  return Promise.resolve(data)
}

setPostCreateData(postCreate)

const ensureChallengePipsConsistency = () => {
  // Does every challenge have all pips ?
  return Promise.all([Pip.find({}, "_id"), CollectiveChallenge.find({}, "_id"),
    TeamMember.find().populate('team'), ChallengeUserPip.find()])
    .then(([pips, challenges, teamMembers, challengeUserPips]) => {
      // Ensure all challenge pips exist
      const updateChallengePips=lodash.product(pips, challenges)
        .map(([pip, challenge]) => ChallengePip.updateMany(
          {pip:pip, collectiveChallenge:challenge},
          {pip:pip, collectiveChallenge:challenge},
          {upsert: true}
        ))
      Promise.all(updateChallengePips)
        .then(res => {
          console.log(`Upsert challenge pips ok:${JSON.stringify(res)}`)
          // Ensure all team mebers pips exist
          const updateMembersPips=ChallengePip.find()
          .then(challengePips => {
            return teamMembers.map(member => {
              const pips=challengePips.filter(p =>idEqual(p.collectiveChallenge, member.team.collectiveChallenge))
              return Promise.all(pips.map(p => {
                return ChallengeUserPip.update(
                  {pip:p, user: member},
                  {pip:p, user: member },
                  {upsert: true}
                )
              }))
            })
          })

          Promise.all(updateMembersPips)
          .then(res => console.log(`Upsert member pips ok:${JSON.stringify(res)}`))
          .catch(err => console.error(`Upsert member pips error:${err}`))
        })
        .catch(err => console.error(`Upsert challenge pips error:${err}`))

    })
}

const computeStatistics= ({id, fields}) => {
  console.log(`Computing stats for ${id} fields ${fields}`)
  const company_filter=id ? {_id: id} : {}
  return Company.find(company_filter)
    .populate([{path: 'webinars', select:'type'},{path: 'groups', populate: 'messages' }])
    .populate({path: 'users', select: 'registered_events,replayed_events', populate:['registered_events','replayed_events']})
    .then(comps => {
      const companies=lodash(comps)
      const webinars=companies.map(c => c.webinars).flatten()
      const webinars_count=webinars.size()
      const registered_count=companies
        .map('users').flatten()
        .map('registered_events').flatten()
        .filter(e => e.type==EVENT_WEBINAR)
        .size()
      const average_webinar_registar=registered_count*1.0/webinars_count
      const webinars_replayed_count=companies
        .map('users').flatten()
        .map('replayed_events').flatten()
        .filter(e => e.type==EVENT_WEBINAR)
        .size()
      const groups_count=companies.map('groups_count').sum()
      const messages_count=companies
        .map('groups').flatten()
        .map('messages').flatten()
        .size()
      return ({
        company: id,
        webinars_count, average_webinar_registar, webinars_replayed_count,
        groups_count, messages_count,
      })
    })
}

/** Upsert PARTICULARS company */
Company.findOneAndUpdate(
  {name: PARTICULAR_COMPANY_NAME},
  {activity: COMPANY_ACTIVITY_SERVICES_AUX_ENTREPRISES},
  {upsert: true},
)
  .then(() => console.log(`Particular company upserted`))
  .catch(err => console.error(`Particular company upsert error:${err}`))


// Ensure spoon gains table contains every source
Object.keys(SPOON_SOURCE).forEach(source => {
  SpoonGain.findOneAndUpdate(
    {source},
    { $setOnInsert: { source, gain: 0 } },
    {upsert: true, runValidators: true},
  )
  .then(res => !res && console.log(`Adding 0 sppon gain for missing source ${source}`))
  .catch(err => console.error(err))
})

// Create missings coachings for any CUSTOMER

User.find({role: ROLE_CUSTOMER}).populate('coachings')
 .then(users => users.filter(user => lodash.isEmpty(user.coachings)))
 .then(users => Promise.all(users.map(user => Coaching.create({user}))))
 .then(coachings => coachings.map(coaching => console.log(`Created missing coaching for ${coaching.user.email}`)))
 .catch(err => console.error(err))

module.exports={
  ensureChallengePipsConsistency,
}
