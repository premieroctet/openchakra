const {BadRequestError} = require('../../utils/errors')
const {
  declareComputedField,
  declareEnumField,
  declareVirtualField,
  getModel,
  idEqual,
  loadFromDb,
  setPostCreateData,
  setPreCreateData,
  setPreprocessGet,
  simpleCloneModel,
} = require('../../utils/database')
const {
  getUserIndChallengeTrophy,
  getUserKeyProgress,
  getUserKeySpoons,
  getUserKeyTrophy,
  getUserKeyReadContents,
  getUserSpoons
} = require('./spoons')
const mongoose = require('mongoose')
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
const {
  ACTIVITY,
  COMPANY_ACTIVITY,
  COMPANY_ACTIVITY_SERVICES_AUX_ENTREPRISES,
  CONTENTS_TYPE,
  DAYS,
  ECOSCORE,
  EVENT_TYPE,
  GENDER,
  GROUPS_CREDIT,
  HARDNESS,
  HOME_STATUS,
  NUTRISCORE,
  PARTICULAR_COMPANY_NAME,
  PERIOD,
  ROLES,
  SPOON_SOURCE,
  SURVEY_ANSWER,
  TARGET_TYPE,
  UNIT,
} = require('./consts')

const preprocessGet = ({model, fields, id, user}) => {
  if (model=='loggedUser') {
    model='user'
    id = user?._id || 'INVALIDID'
  }
  if (model=='content' && !!id) {
    return Content.findByIdAndUpdate(id, {$addToSet: {viewed_by: user._id}})
      .then(() => ({model, fields, id}))
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
    return Team.exists({name: params.name?.trim(), collectiveChallenge: params.collectiveChallenge})
      .then(exists => {
        if (exists) { throw new BadRequestError(`L'équipe ${params.name} existe déjà pour ce challenge`)}
        return {model, params}
      })
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
    requires: '_all_contents', multiple: true,
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
    requires: '_all_individual_challenges,skipped_events,passed_events', multiple: true,
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
  declareVirtualField({model: m, field: 'available_menu', instance: 'menu',
    multiple: false,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'menu'}},
  })
  declareVirtualField({model: m, field: 'collective_challenges', instance: 'Array', multiple: true,
    requires:'company.collective_challenges',
    caster: {
      instance: 'ObjectID',
      options: {ref: 'collectiveChallenge'}},
  })
  declareVirtualField({model: m, field: 'available_groups', instance: 'Array',
    requires: 'targets,company.groups,company.groups.targets,registered_groups', multiple: true,
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
    requires: '_all_targets.contents,objective_targets,health_targets,activity_targets,specificity_targets,home_target',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'target'}},
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

const EVENT_MODELS=['event', 'collectiveChallenge', 'individualChallenge', 'menu', 'webinar']
EVENT_MODELS.forEach(m => {
  declareVirtualField({model: m, field: 'type', instance: 'String', enumValues: EVENT_TYPE})
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
declareEnumField({model: 'offer', field: 'groups_credit', enumValues: GROUPS_CREDIT})

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

declareVirtualField({model: 'teamMember', field: 'spoons', instance: 'Number'})

declareVirtualField({model: 'collectiveChallenge', field: 'teams', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'team'}},
})

const getAvailableContents = (user, params, data) => {
  return Content.find()
    .then(contents => {
      const user_targets=user.targets.map(t => t._id.toString())
      const filtered_contents=contents.filter(c => {
        if (c.default) {
          return true
        }
        const content_targets=c.targets?.map(t => t._id.toString()) || []
        return lodash.isEqual(user_targets.sort(), content_targets.sort())
      })
      return filtered_contents
    })
}

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
  console.log(data.recipes.map(r => [r.recipe.name,r.recipe._id]))
  const ingredients=lodash.flatten(data?.recipes.map(r => r.recipe.ingredients))
  const ingredientsGroup=lodash.groupBy(ingredients, i => i.ingredient._id)
  const result=lodash(ingredientsGroup)
    .mapValues(ingrs=>({ingredient:ingrs[0].ingredient, quantity: lodash.sumBy(ingrs, 'quantity')}))
    .values()
    .value()
  console.log(JSON.stringify(result, null, 2))
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

declareComputedField('user', 'available_contents', getAvailableContents)
declareComputedField('loggedUser', 'available_contents', getAvailableContents)
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
declareComputedField('user', 'spoons_count', getUserSpoons)
declareComputedField('loggedUser', 'spoons_count', getUserSpoons)
declareComputedField('menu', 'shopping_list', getMenuShoppingList)
declareComputedField('key', 'user_surveys_progress', getUserSurveysProgress)


const postCreate = ({model, params, data,user}) => {
  // Create company => duplicate offer
  if (model=='company') {
    return Offer.findById(data.offer)
      .then(offer => Offer.create(simpleCloneModel(offer)))
      .then(offer => { data.offer=offer._id; return data })
      .then(data => data.save())
  }
  if (model=='booking') {
    console.log(`Sending mail to ${data.booking_user.email} and admins for booking ${data._id}`)
    sendNewBookingToMember({booking: data})
    User.find({role: FUMOIR_MANAGER})
      .then(managers => Promise.allSettled(managers.map(manager => sendNewBookingToManager({booking: data, manager}))))
  }
  if (model=='team') {
    return TeamMember.create({team: data, user})
      .then(()=> data)
  }

  return Promise.resolve(data)
}

setPostCreateData(postCreate)

/** Upsert PARTICULARS company */
Company.findOneAndUpdate(
  {name: PARTICULAR_COMPANY_NAME},
  {activity: COMPANY_ACTIVITY_SERVICES_AUX_ENTREPRISES},
  {upsert: true},
)
  .then(() => console.log(`Particular company upserted`))
  .catch(err => console.error(`Particular company upsert error:${err}`))

module.exports={
  getAvailableContents,
}
