const {
  declareComputedField,
  declareEnumField,
  declareVirtualField,
  differenceSet,
  getModel,
  idEqual,
  loadFromDb,
  setFilterDataUser,
  setImportDataFunction,
  setIntersects,
  setPostCreateData,
  setPostDeleteData,
  setPostPutData,
  setPreCreateData,
  setPreprocessGet,
  simpleCloneModel,
} = require('../../utils/database')
const {
  sendDietPreRegister2Admin,
  sendDietPreRegister2Diet,
  sendInactivity15,
  sendInactivity30,
  sendInactivity45,
  sendIndChallenge1,
  sendIndChallenge2,
  sendIndChallenge3,
  sendIndChallenge5,
  sendIndChallenge6,
  sendNewWebinar,
  sendSaturday1,
  sendSaturday2,
  sendSaturday3,
  sendSaturday4,
  sendWebinarIn3Days,
} = require('./mailing')
const { formatDateTime } = require('../../../utils/text')
const Webinar = require('../../models/Webinar')
require('../../models/Target')
require('../../models/UserQuizz')
require('../../models/Key')
require('../../models/Association')
require('../../models/Item')
require('../../models/Question')
const { updateWorkflows } = require('./workflows')
const {
  ACTIVITY,
  ANSWER_STATUS,
  APPOINTMENT_CURRENT,
  APPOINTMENT_PAST,
  APPOINTMENT_STATUS,
  APPOINTMENT_TO_COME,
  COACHING_MODE,
  COACHING_QUESTION_STATUS,
  COMPANY_ACTIVITY,
  COMPANY_ACTIVITY_SERVICES_AUX_ENTREPRISES,
  CONTENTS_TYPE,
  DAYS,
  DIET_ACTIVITIES,
  DIET_REGISTRATION_STATUS,
  ECOSCORE,
  EVENT_TYPE,
  EVENT_WEBINAR,
  FOOD_DOCUMENT_TYPE,
  GENDER,
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_NON_BINARY,
  GROUPS_CREDIT,
  HARDNESS,
  HOME_STATUS,
  MEAL_POSITION,
  NUTRISCORE,
  PARTICULAR_COMPANY_NAME,
  PERIOD,
  QUIZZ_QUESTION_TYPE,
  QUIZZ_TYPE,
  QUIZZ_TYPE_LOGBOOK,
  QUIZZ_TYPE_PROGRESS,
  REGISTRATION_WARNING,
  REGISTRATION_WARNING_CODE_MISSING,
  REGISTRATION_WARNING_LEAD_MISSING,
  ROLES,
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_EXTERNAL_DIET,
  ROLE_RH,
  ROLE_SUPER_ADMIN,
  SEASON,
  SPOON_SOURCE,
  SURVEY_ANSWER,
  TARGET_COACHING,
  TARGET_SPECIFICITY,
  TARGET_TYPE,
  UNIT,
  MENU_PEOPLE_COUNT,
  convertQuantity,
  CALL_STATUS,
  CALL_DIRECTION,
  ROLE_SUPPORT,
  COACHING_CONVERSION_STATUS,
  COACHING_CONVERSION_TO_COME,
  COACHING_CONVERSION_CANCELLED,
  COACHING_CONVERSION_CONVERTED,
  RECIPE_TYPE,
} = require('./consts')
const {
  HOOK_DELETE,
  HOOK_INSERT,
  HOOK_UPDATE,
  createAppointment,
  deleteAppointment,
  getAccount,
  getAgenda,
  getAppointmentTypes,
  getAppointmentVisioLink,
  upsertAccount
} = require('../agenda/smartagenda')

const Category = require('../../models/Category')
const { delayPromise } = require('../../utils/concurrency')
const {
  getSmartAgendaConfig,
  isDevelopment,
} = require('../../../config/config')
const AppointmentType = require('../../models/AppointmentType')
require('../../models/LogbookDay')
const { importLeads } = require('./leads')
const Quizz = require('../../models/Quizz')
const CoachingLogbook = require('../../models/CoachingLogbook')
const {
  CREATED_AT_ATTRIBUTE,
  UPDATED_AT_ATTRIBUTE
} = require('../../../utils/consts')
const UserQuizzQuestion = require('../../models/UserQuizzQuestion')
const QuizzQuestion = require('../../models/QuizzQuestion')
const { BadRequestError, ForbiddenError, NotFoundError } = require('../../utils/errors')
const SpoonGain = require('../../models/SpoonGain')
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
  getUserSpoons,
  getObtainedTrophy
} = require('./spoons')
const mongoose = require('mongoose')
require('lodash.product')
const lodash = require('lodash')
const moment = require('moment')
const UserSurvey = require('../../models/UserSurvey')
const Offer = require('../../models/Offer')
const Content = require('../../models/Content')
const Company = require('../../models/Company')
const User = require('../../models/User')
const Team = require('../../models/Team')
const TeamMember = require('../../models/TeamMember')
const Coaching = require('../../models/Coaching')
const Appointment = require('../../models/Appointment')
const Message = require('../../models/Message')
const Lead = require('../../models/Lead')
const cron = require('../../utils/cron')
const Group = require('../../models/Group')

const filterDataUser = ({ model, data, id, user }) => {
  if (model == 'offer' && !id) {
    return Offer.find({ company: null })
      .then(offers => data.filter(d => offers.some(o => idEqual(d._id, o._id))))
  }
  if (model == 'user' && user?.role == ROLE_RH) {
    data = data.filter(u => idEqual(id, user._id) || (user.company && idEqual(u.company?._id, user.company?._id)))
  }
  // Filter leads for RH
  if (model == 'lead' && user?.role == ROLE_RH) {
    return User.findById(user?.id).populate('company')
      .then(user => {
        return data = data.filter(d => d.company_code == user?.company?.code)
      })
  }
  // Return not affected leads or affected to me
  if (model == 'lead' && user?.role == ROLE_SUPPORT) {
    return data = data.filter(lead => lodash.isNil(lead.operator) || idEqual(lead.operator._id, user._id))
  }
  // TODO Do not sort anymore to not confuse pagination
  // data = lodash.sortBy(data, ['order', 'fullname', 'name', 'label'])
  return Promise.resolve(data)
}

setFilterDataUser(filterDataUser)

const preprocessGet = ({ model, fields, id, user, params }) => {
  if (model == 'loggedUser') {
    model = 'user'
    id = user?._id || 'INVALIDID'
  }
  if (model == 'user') {
    fields.push('company')
  }
  if (model == 'adminDashboard') {
    if (![ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_RH].includes(user.role)) {
      return Promise.resolve({ model, fields, id, data: [] })
    }
    if (user.role == ROLE_RH) {
      id = user.company._id
    }
    return computeStatistics({ id, fields })
      .then(stats => ({ model, fields, id, data: [stats] }))

  }
  if (model == 'conversation') {
    const getPartner = (m, user) => {
      return idEqual(m.sender._id, user._id) ? m.receiver : m.sender
    }

    // Get non-group messages (i.e. no group attribute)
    return Message.find({ $and: [{ $or: [{ sender: user._id }, { receiver: user._id }] }, { group: null }] })
      .populate({ path: 'sender', populate: { path: 'company' } })
      .populate({ path: 'receiver', populate: { path: 'company' } })
      .sort({ CREATED_AT_ATTRIBUTE: 1 })
      .then(messages => {
        if (id) {
          messages = messages.filter(m => idEqual(getPartner(m, user)._id, id))
          // If no messages for one parner, forge it
          if (lodash.isEmpty(messages)) {
            return User.findById(id).populate('company')
              .then(partner => {
                const data = [{ _id: partner._id, partner, messages: [] }]
                return { model, fields, id, data }
              })
          }
        }
        const partnerMessages = lodash.groupBy(messages, m => getPartner(m, user)._id)
        const convs = lodash(partnerMessages)
          .values()
          .map(msgs => { const partner = getPartner(msgs[0], user); return ({ _id: partner._id, partner, messages: msgs }) })
          .sortBy(CREATED_AT_ATTRIBUTE, 'asc')
        return { model, fields, id, data: convs }
      })
  }

  return Promise.resolve({ model, fields, id })

}

setPreprocessGet(preprocessGet)

const preCreate = ({ model, params, user }) => {
  if (['diploma', 'comment', 'measure', 'content', 'collectiveChallenge', 'individualChallenge', 'webinar', 'menu'].includes(model)) {
    params.user = params?.user || user
  }
  if (['message'].includes(model)) {
    params.sender = user
  }
  if (['content'].includes(model)) {
    params.creator = user
  }
  if (['team'].includes(model)) {
    return Team.findOne({ name: params.name?.trim(), collectiveChallenge: params.collectiveChallenge }).populate('collectiveChallenge')
      .then(team => {
        if (team) { throw new BadRequestError(`L'équipe ${params.name} existe déjà pour ce challenge`) }
        return CollectiveChallenge.findById(params.collectiveChallenge)
      })
      .then(challenge => {
        if (!challenge) { throw new BadRequestError(`Le challenge ${params.collectiveChallenge} n'existe pas`) }
        if (moment().isAfter(moment(challenge.start_date))) { throw new BadRequestError(`Le challenge a déjà démarré`) }
        return { model, params }
      })
  }
  if (model == 'quizzQuestion') {
    if (user.role == ROLE_EXTERNAL_DIET) {
      params.diet_private = user._id
    }
  }
  // Handle both nutrition advice & appointment
  if (['nutritionAdvice', 'appointment'].includes(model)) {
    const isAppointment = model == 'appointment'
    if (![ROLE_EXTERNAL_DIET, ROLE_CUSTOMER, ROLE_SUPPORT].includes(user.role)) {
      throw new ForbiddenError(`Seuls les rôles patient, diet et support peuvent prendre un rendez-vous`)
    }
    let customer_id, diet_id
    if (user.role != ROLE_CUSTOMER) {
      if (!params.user) { throw new BadRequestError(`L'id du patient doit être fourni`) }
      customer_id = params.user
    }
    else { //CUSTOMER
      customer_id = user._id
    }
    return loadFromDb({
      model: 'user', id: customer_id,
      fields: [
        'latest_coachings.appointments', 'latest_coachings.reasons', 'latest_coachings.remaining_credits', 'latest_coachings.appointment_type',
        'latest_coachings.nutrition_advices', 'latest_coachings.remaining_nutrition_credits', 'company.reasons', 'phone',
      ],
      user,
    })
      .then(([usr]) => {
        // Phone is required for appintment
        if (lodash.isEmpty(usr.phone)) {
          throw new BadRequestError(`Le numéro de téléphone est obligatoire pour prendre rendez-vous`)
        }
        // If company has coaching reasons, check if the user coaching intersects at least one
        const company_reasons=usr.company?.reasons
        if (company_reasons?.length > 0) {
          const user_reasons=usr.latest_coachings?.[0]?.reasons
          if (!setIntersects(user_reasons, company_reasons)) {
            throw new BadRequestError(`Vos motifs de consultation ne sont pas pris en charge par votre compagnie`)
          }
        }
        // Check remaining credits
        const latest_coaching = usr.latest_coachings[0]
        if (!latest_coaching) {
          throw new ForbiddenError(`Aucun coaching en cours`)
        }
        console.log(latest_coaching.remaining_nutrition_credits)
        if ((isAppointment && latest_coaching.remaining_credits <= 0)
          || (!isAppointment && latest_coaching.remaining_nutrition_credits <= 0)) {
          throw new ForbiddenError(`L'offre ne permet pas/plus de prendre un rendez-vous`)
        }
        // Check appointment to come
        if (isAppointment && latest_coaching.appointments.find(a => moment(a.end_date).isAfter(moment()))) {
          throw new ForbiddenError(`Il existe déjà un rendez-vous à venir`)
        }
        if (isAppointment) {
          return { model, params: { coaching: latest_coaching._id, appointment_type: latest_coaching.appointment_type._id, ...params } }
        }
        else { // Nutrition advice
          return { model, params: { coaching: latest_coaching._id, ...params } }
        }
      })
  }
  return Promise.resolve({ model, params })
}

setPreCreateData(preCreate)

const postPutData = ({ model, params, id, value, data, user }) => {
  if (model == 'appointment' && params.logbooks) {
    return Appointment.findById(id)
      .then(appointment => logbooksConsistency(appointment.coaching._id))
      .then(() => params)
  }
  if (model == 'coaching' && params.quizz_templates) {
    const tpl_attribute = 'quizz_templates'
    const inst_attribute = 'quizz'
    return mongoose.models.coaching.findById(id).populate([
      { path: tpl_attribute, populate: 'questions' },
      { path: inst_attribute, populate: { path: 'quizz', populate: 'questions' } },
    ])
      .then(coaching => {
        const extraUserQuizz = coaching[inst_attribute].filter(uq => !coaching[tpl_attribute].some(q => idEqual(q._id, uq.quizz._id)))
        const missingUserQuizz = differenceSet(coaching[tpl_attribute], coaching[inst_attribute].map(uq => uq.quizz))
        const addQuizzs = Promise.all(missingUserQuizz.map(q => q.cloneAsUserQuizz(coaching)))
        return addQuizzs
          .then(quizzs => mongoose.models.coaching.findByIdAndUpdate(id, { $addToSet: { [inst_attribute]: quizzs } }))
          .then(() => mongoose.models.coaching.findByIdAndUpdate(id, { $pull: { [inst_attribute]: { $in: extraUserQuizz } } }))
          .then(() => Promise.all(extraUserQuizz.map(q => q.delete())))
          .then(() => mongoose.models.coaching.findById(id))
      })
  }
  return Promise.resolve(params)
}

setPostPutData(postPutData)

const USER_MODELS = ['user', 'loggedUser']
USER_MODELS.forEach(m => {
  declareVirtualField({ model: m, field: 'fullname', instance: 'String', requires: 'firstname,lastname' })
  declareVirtualField({ model: m, field: 'password2', instance: 'String' })
  declareEnumField({ model: m, field: 'home_status', enumValues: HOME_STATUS })
  declareEnumField({ model: m, field: 'role', enumValues: ROLES })
  declareEnumField({ model: m, field: 'gender', enumValues: GENDER })
  declareEnumField({ model: m, field: 'activity', enumValues: ACTIVITY })
  declareVirtualField({ model: m, field: 'spoons_count', instance: 'Number' })
  declareVirtualField({
    model: m, field: '_all_contents', instance: 'Array',
    requires: 'dummy',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'content' }
    },
  })
  // declareVirtualField({
  //   model: m, field: 'contents', instance: 'Array',
  //   multiple: true,
  //   caster: {
  //     instance: 'ObjectID',
  //     options: { ref: 'content' }
  //   },
  // })
  declareVirtualField({
    model: m, field: 'webinars', instance: 'Array',
    requires: 'company,company.webinars,skipped_events,passed_events', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'webinar' }
    },
  })
  declareVirtualField({
    model: m, field: 'available_webinars', instance: 'Array',
    requires: 'webinars', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'webinar' }
    },
  })
  declareVirtualField({
    model: m, field: 'past_webinars', instance: 'Array',
    requires: '_all_webinars', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'webinar' }
    },
  })
  declareVirtualField({
    model: m, field: '_all_events', instance: 'Array',
    requires: 'dummy, _all_menus,_all_individual_challenges,collective_challenges,_all_webinars',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'webinar' }
    },
  })
  declareVirtualField({
    model: m, field: '_all_webinars', instance: 'Array',
    requires: 'company.webinars', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'webinar' }
    },
  })
  declareVirtualField({
    model: m, field: '_all_individual_challenges', instance: 'Array', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'individualChallenge' }
    },
  })
  declareVirtualField({
    model: m, field: 'individual_challenges', instance: 'Array',
    requires: '_all_individual_challenges.key,skipped_events,passed_events,routine_events,registered_events.type,_all_individual_challenges.type,failed_events,current_individual_challenge',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'individualChallenge' }
    },
  })
  declareVirtualField({
    model: m, field: 'passed_individual_challenges', instance: 'Array',
    requires: '_all_individual_challenges,passed_events', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'individualChallenge' }
    },
  })
  declareVirtualField({
    model: m, field: '_all_menus', instance: 'menu',
    requires: 'dummy',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'menu' }
    },
  })
  declareVirtualField({
    model: m, field: 'available_menus', instance: 'Array',
    requires: 'dummy',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'menu' }
    },
  })
  declareVirtualField({
    model: m, field: 'past_menus', instance: 'Array',
    requires: 'dummy',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'menu' }
    },
  })
  declareVirtualField({
    model: m, field: 'future_menus', instance: 'Array',
    requires: 'dummy',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'menu' }
    },
  })
  declareVirtualField({
    model: m, field: 'collective_challenges', instance: 'Array', multiple: true,
    requires: 'company,company.collective_challenges',
    caster: {
      instance: 'ObjectID',
      options: { ref: 'collectiveChallenge' }
    },
  })
  declareVirtualField({
    model: m, field: 'available_groups', instance: 'Array',
    requires: 'targets,company.groups,company.groups.targets,registered_groups,company.groups.key', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'group' }
    },
  })
  declareVirtualField({
    model: m, field: 'registered_groups', instance: 'Array', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'group' }
    },
  })
  declareVirtualField({
    model: m, field: 'measures', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'measure' }
    },
  })
  declareVirtualField({
    model: m, field: 'last_measures', instance: 'Array',
    requires: 'measures', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'measure' }
    },
  })
  declareVirtualField({
    model: m, field: 'pinned_contents', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'content' }
    },
  })
  declareVirtualField({
    model: m, field: '_all_targets', instance: 'Array',
    requires: 'dummy',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'target' }
    },
  })
  declareVirtualField({
    model: m, field: 'targets', instance: 'Array',
    requires: '_all_targets.contents,objective_targets,health_targets,activity_target,specificity_targets,home_target',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'target' }
    },
  })
  declareVirtualField({
    model: m, field: 'current_individual_challenge', instance: 'individualChallenge',
    requires: 'registered_events,failed_events,passed_events',
    multiple: false,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'individualChallenge' }
    },
  })
  declareVirtualField({
    model: m, field: 'offer', instance: 'offer',
    requires: 'company.offers',
    multiple: false,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'offer' }
    },
  })
  declareVirtualField({
    model: m, field: 'surveys', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'userSurvey' }
    },
  })
  declareVirtualField({
    model: m, field: 'diploma', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'diploma' }
    },
  })
  declareEnumField({ model: m, field: 'registration_status', enumValues: DIET_REGISTRATION_STATUS })
  declareVirtualField({
    model: m, field: 'diet_comments', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'dietComment' }
    },
  })
  declareVirtualField({
    model: m, field: 'diet_average_note', instance: 'Number',
    requires: 'diet_comments._defined_notes'
  })
  declareVirtualField({
    model: m, field: 'profile_progress', instance: 'Number',
    requires: 'diploma,adeli,siret,signed_charter'
  })
  declareVirtualField({
    model: m, field: 'diet_objectives', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'quizzQuestion' }
    },
  })
  declareVirtualField({
    model: m, field: 'coachings', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'coaching' }
    },
  })
  declareVirtualField({
    model: m, field: 'latest_coachings', instance: 'Array', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'coaching' }
    },
  })
  declareVirtualField({
    model: m, field: 'diet_questions', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'quizzQuestion' }
    },
  })
  declareVirtualField({
    model: m, field: 'diet_coachings', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'coaching' }
    },
  })
  // declareVirtualField({
  //   model: m, field: 'diet_appointments', instance: 'Array',
  //   relies_on: 'diet_coachings.appointments',
  //   multiple: true,
  //   caster: {
  //     instance: 'ObjectID',
  //     options: { ref: 'appointment' }
  //   },
  // })
  // declareVirtualField({
  //   model: m, field: 'diet_current_future_appointments', instance: 'Array',
  //   multiple: true,
  //   caster: {
  //     instance: 'ObjectID',
  //     options: { ref: 'appointment' }
  //   },
  // })
  // TODO This causes error because of relies_on
  //declareVirtualField({ model: m, field: 'diet_appointments_count', instance: 'Number', requires: 'diet_appointments'})
  // declareVirtualField({ model: m, field: 'diet_appointments_count', instance: 'Number', requires: 'diet_coachings'})
  // declareVirtualField({
  //   model: m, field: 'diet_patients', instance: 'Array',
  //   multiple: true,
  //   caster: {
  //     instance: 'ObjectID',
  //     options: { ref: 'user' }
  //   },
  // })
  // TODO This causes error because of relies_on
  //declareVirtualField({ model: m, field: 'diet_patients_count', instance: 'Number'})
  declareEnumField({ model: m, field: 'registration_warning', enumValues: REGISTRATION_WARNING })
  declareEnumField({ model: m, field: 'activities', enumValues: DIET_ACTIVITIES })
  declareVirtualField({
    model: m, field: 'availability_ranges', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'range' }
    },
  })
  declareVirtualField({ model: m, field: 'imc', instance: 'Number', requires: 'measures,height' })
  declareVirtualField({ model: m, field: 'days_inactivity', instance: 'Number', requires: 'last_activity' })
  declareVirtualField({
    model: m, field: 'keys', instance: 'Array',
    requires: 'dummy',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: { ref: 'key' }
    },
  })
})
// End user/loggedUser

declareEnumField({ model: 'company', field: 'activity', enumValues: COMPANY_ACTIVITY })
declareVirtualField({
  model: 'company', field: 'administrators', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'user' }
  },
})
declareVirtualField({
  model: 'company', field: 'webinars', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'webinar' }
  },
})
declareVirtualField({
  model: 'company', field: 'groups', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'group' }
  },
})
declareVirtualField({ model: 'company', field: 'likes_count', instance: 'Number' })
declareVirtualField({ model: 'company', field: 'comments_count', instance: 'Number' })
declareVirtualField({ model: 'company', field: 'shares_count', instance: 'Number' })
declareVirtualField({ model: 'company', field: 'contents_count', instance: 'Number' })
declareVirtualField({ model: 'company', field: 'groups_count', instance: 'Number', requires: 'groups' })
declareVirtualField({
  model: 'company', field: 'children', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'company' }
  },
})
declareVirtualField({
  model: 'company', field: 'collective_challenges', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'collectiveChallenge' }
  },
})
declareVirtualField({
  model: 'company', field: 'offers', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'offer' }
  },
})
declareVirtualField({
  model: 'company', field: 'users', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'user' }
  },
})
declareVirtualField({
  model: 'company', field: 'leads', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'lead' }
  },
})


declareEnumField({ model: 'content', field: 'type', enumValues: CONTENTS_TYPE })
declareVirtualField({ model: 'content', field: 'likes_count', instance: 'Number', requires: 'likes' })
declareVirtualField({ model: 'content', field: 'shares_count', instance: 'Number', requires: 'shares' })
declareVirtualField({
  model: 'content', field: 'comments', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'comment' }
  },
})
declareVirtualField({ model: 'content', field: 'liked', instance: 'Boolean', requires: 'likes' })
declareVirtualField({ model: 'content', field: 'pinned', instance: 'Boolean', requires: 'pins' })
declareVirtualField({ model: 'content', field: 'comments_count', instance: 'Number', requires: 'comments' })
declareVirtualField({ model: 'content', field: 'search_text', instance: 'String', requires: 'name,contents' })

declareVirtualField({ model: 'dietComment', field: '_defined_notes', instance: 'Number', multiple: 'true' })

const getEventStatus = (userId, params, data) => {
  return Promise.all([
    User.findById(userId, { registered_events: 1, passed_events: 1, failed_events: 1, skipped_events: 1, routine_events: 1 }),
    getModel(data._id, ['event', 'menu', 'webinar', 'individualChallenge', 'collectiveChallenge'])
  ])
    .then(([user, modelName]) => {
      if (modelName == 'individualChallenge') {
        // Past if failed or passed or skipped or routine
        if (['passed_events', 'failed_events', 'skipped_events', 'routine_events'].some(att => {
          return user[att].some(e => idEqual(e._d, data._id))
        })) {
          return APPOINTMENT_PAST
        }
        if (user.registered_events.some(e => idEqual(e.event._id, data._id))) {
          return APPOINTMENT_CURRENT
        }
        return APPOINTMENT_TO_COME
      }
      const now = moment()
      return now.isAfter(data.end_date) ? APPOINTMENT_PAST :
        now.isBefore(data.start_date) ? APPOINTMENT_TO_COME :
          APPOINTMENT_CURRENT
    })
    .catch(console.error)
  /**
  console.log(data._id)
  */
}

const EVENT_MODELS = ['event', 'collectiveChallenge', 'individualChallenge', 'menu', 'webinar']
EVENT_MODELS.forEach(m => {
  declareVirtualField({ model: m, field: 'type', instance: 'String', enumValues: EVENT_TYPE })
  declareVirtualField({ model: m, field: 'duration', instance: 'Number', requires: 'start_date,end_date' })
  // declareVirtualField({ model: m, field: 'status', instance: 'String', requires: 'start_date,end_date', enumValues: APPOINTMENT_STATUS })
  declareEnumField({ model: m, field: 'status', enumValues: APPOINTMENT_STATUS })
  declareComputedField({model: m, field: 'status', getterFn: getEventStatus})
})

declareEnumField({ model: 'individualChallenge', field: 'hardness', enumValues: HARDNESS })

declareVirtualField({
  model: 'individualChallenge', field: 'trophy_picture',
  instance: 'String', requires: 'trophy_on_picture,trophy_off_picture,spoons_count_for_trophy'
})
declareVirtualField({
  model: 'individualChallenge', field: 'obtained', instance: 'Boolean', requires: 'spoons_count_for_trophy'
})

declareEnumField({ model: 'category', field: 'type', enumValues: TARGET_TYPE })
declareVirtualField({
  model: 'category', field: 'targets', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'target' }
  },
})

declareEnumField({ model: 'spoonGain', field: 'source', enumValues: SPOON_SOURCE })

declareVirtualField({
  model: 'offer', field: 'company', instance: 'offer', multiple: false,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'company' }
  },
})

declareVirtualField({
  model: 'target', field: 'contents', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'content' }
  },
})
declareVirtualField({
  model: 'target', field: 'groups', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'group' }
  },
})
declareVirtualField({
  model: 'target', field: 'users', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'user' }
  },
})

declareEnumField({ model: 'recipe', field: 'nutriscore', enumValues: NUTRISCORE })
declareEnumField({ model: 'recipe', field: 'ecoscore', enumValues: ECOSCORE })
declareVirtualField({
  model: 'recipe', field: 'ingredients', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'recipeIngredient' }
  },
})
declareEnumField({ model: 'recipe', field: 'season', enumValues: SEASON })
declareVirtualField({ model: 'recipe', field: 'type', instance: 'String', requires: 'duration', enumValues: RECIPE_TYPE })

declareVirtualField({
  model: 'menu', field: 'recipes', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'menuRecipe' }
  },
})
declareVirtualField({
  model: 'menu', field: 'shopping_list', instance: 'Array',
  requires: 'recipes.recipe.ingredients.ingredient.name',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'recipeIngredient' }
  },
})
declareVirtualField({ model: 'menu', field: 'people_count', instance: 'Number' })

declareEnumField({ model: 'ingredient', field: 'unit', enumValues: UNIT })
declareVirtualField({ model: 'ingredient', field: 'label', instance: 'String', requires: 'name,unit' })

declareVirtualField({
  model: 'group', field: 'messages', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'message' }
  },
})
declareVirtualField({
  model: 'group', field: 'pinned_messages', instance: 'Array',
  requires: 'dummy,messages.pins,messages.pinned', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'message' }
  },
})
declareVirtualField({ model: 'group', field: 'users_count', instance: 'Number' })
declareVirtualField({ model: 'group', field: 'messages_count', instance: 'Number', requires: 'messages' })

declareVirtualField({ model: 'message', field: 'pinned', instance: 'Boolean', requires: 'pins' })
declareVirtualField({ model: 'message', field: 'liked', instance: 'Boolean', requires: 'likes' })
declareVirtualField({ model: 'message', field: 'likes_count', instance: 'Number', requires: 'likes' })

declareVirtualField({
  model: 'comment', field: 'children', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'comment' }
  },
})

declareVirtualField({ model: 'key', field: 'trophy_picture', instance: 'String', requires: 'spoons_count_for_trophy,trophy_on_picture,trophy_off_picture' })
declareVirtualField({ model: 'key', field: 'user_spoons', instance: 'Number' })
declareVirtualField({ model: 'key', field: 'user_spoons_str', instance: 'String' })
declareVirtualField({ model: 'key', field: 'user_progress', instance: 'Number' })
declareVirtualField({ model: 'key', field: 'user_read_contents', instance: 'Number' })
// declareVirtualField({
//   model: 'key', field: 'user_surveys_progress', instance: 'Array',
//   multiple: true,
//   caster: {
//     instance: 'ObjectID',
//     options: { ref: 'chartPoint' }
//   },
// })
declareVirtualField({ model: 'key', field: 'user_passed_challenges', instance: 'Number', requires: 'passed_events' })
declareVirtualField({ model: 'key', field: 'user_passed_webinars', instance: 'Number', requires: 'passed_events' })
declareVirtualField({ model: 'key', field: 'dummy', instance: 'Number'})


declareVirtualField({
  model: 'userSurvey', field: 'questions', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'userQuestion' }
  },
})

declareEnumField({ model: 'userQuestion', field: 'answer', enumValues: SURVEY_ANSWER })

declareEnumField({ model: 'menuRecipe', field: 'day', enumValues: DAYS })
declareEnumField({ model: 'menuRecipe', field: 'period', enumValues: PERIOD })
declareEnumField({ model: 'menuRecipe', field: 'position', enumValues: MEAL_POSITION })

declareVirtualField({ model: 'userQuestion', field: 'index', instance: 'Number', requires: 'survey.questions' })
declareVirtualField({ model: 'userQuestion', field: 'total', instance: 'Number', requires: 'survey.questions' })

declareVirtualField({
  model: 'pip', field: 'comments', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'comment' }
  },
})
declareVirtualField({ model: 'pip', field: 'comments_count', instance: 'Number', requires: 'comments' })

declareVirtualField({
  model: 'team', field: 'members', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'teamMember' }
  },
})
declareVirtualField({ model: 'team', field: 'spoons_count', instance: 'Number', requires: 'members.pips.valid' })

declareVirtualField({ model: 'teamMember', field: 'spoons', instance: 'Number' })
declareVirtualField({
  model: 'teamMember', field: 'pips', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'challengeUserPip' }
  },
})

declareVirtualField({
  model: 'collectiveChallenge', field: 'teams', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'team' }
  },
})

declareVirtualField({
  model: 'collectiveChallenge', field: 'pips', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'challengePip' }
  },
})

declareVirtualField({
  model: 'challengePip', field: 'userPips', instance: 'Array', multiple: true,
  requires: 'userPips.valid,pip.spoons',
  caster: {
    instance: 'ObjectID',
    options: { ref: 'challengeUserPip' }
  },
})
declareVirtualField({ model: 'challengePip', field: 'spoons', instance: 'Number' })
declareVirtualField({
  model: 'challengePip', field: 'pendingUserPips', instance: 'Array', multiple: true,
  requires: 'userPips.proof,userPips.valid',
  caster: {
    instance: 'ObjectID',
    options: { ref: 'challengeUserPip' }
  },
})

declareVirtualField({
  model: 'coaching', field: 'appointments', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'appointment' }
  },
})
declareVirtualField({
  model: 'coaching', field: 'appointments_future', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'appointment' }
  },
})
declareVirtualField({
  model: 'coaching', field: 'remaining_credits', instance: 'Number',
  requires: 'user.offer.coaching_credit,spent_credits,user.company.offers.coaching_credit,user.role'
}
)
declareVirtualField({ model: 'coaching', field: 'spent_credits', instance: 'Number', requires: 'appointments' })

declareVirtualField({
  model: 'coaching', field: 'remaining_nutrition_credits', instance: 'Number',
  requires: 'user.offer.nutrition_credit,spent_nutrition_credits,user.company.offers.nutrition_credit,user.role'
}
)
declareVirtualField({ model: 'coaching', field: 'spent_nutrition_credits', instance: 'Number', requires: 'nutrition_advices' })

declareVirtualField({
  model: 'coaching', field: 'questions', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'userCoachingQuestion' }
  },
})
declareEnumField({ model: 'coaching', field: 'mode', instance: 'String', enumValues: COACHING_MODE })
declareVirtualField({
  model: 'coaching', field: '_all_diets', instance: 'Array', multiple: true,
  requires: 'dummy',
  caster: {
    instance: 'ObjectID',
    options: { ref: 'user' }
  },
})
declareVirtualField({
  model: 'coaching', field: 'available_diets', instance: 'Array', multiple: true,
  requires: `_all_diets.reasons,_all_diets.customer_companies,_all_diets.availability_ranges,\
user.company,appointment_type,_all_diets.diet_coaching_enabled`,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'user' }
  },
})
declareVirtualField({
  model: 'coaching', field: 'current_objectives', instance: 'Array', multiple: true,
  requires: 'appointments.objectives',
  caster: {
    instance: 'ObjectID',
    options: { ref: 'quizzQuestion' }
  },
})
declareVirtualField({
  model: 'coaching', field: 'quizz', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'userQuizz' }
  },
})
declareVirtualField({
  model: 'coaching', field: 'progress', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'userQuizz' }
  },
})
declareVirtualField({
  model: 'coaching', field: 'all_logbooks', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'coachingLogbook' }
  },
})
declareVirtualField({
  model: 'coaching', field: 'logbooks', instance: 'Array', multiple: true,
  requires: 'all_logbooks.logbook.questions.multiple_answers,all_logbooks.logbook.questions.answer_status',
  caster: {
    instance: 'ObjectID',
    options: { ref: 'logbookDay' }
  },
})
declareVirtualField({
  model: 'coaching', field: 'diet_availabilities', instance: 'Array',
  requires: 'diet,appointment_type,diet.availability_ranges.appointment_type,appointments',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'availability' }
  },
})
declareVirtualField({
  model: 'coaching', field: 'appointment_type', instance: 'appointmentType',
  requires: 'appointments,user.company.assessment_appointment_type,user.company.followup_appointment_type',
  multiple: false,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'appointmentType' }
  },
})
declareVirtualField({
  model: 'coaching', field: 'nutrition_advices', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'nutritionAdvice' }
  },
})


declareEnumField({ model: 'userCoachingQuestion', field: 'status', enumValues: COACHING_QUESTION_STATUS })

declareVirtualField({
  model: 'adminDashboard', field: 'company', instance: 'company', multiple: false,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'company' }
  },
})
declareVirtualField({ model: 'adminDashboard', field: 'webinars_count', instance: 'Number' })
declareVirtualField({ model: 'adminDashboard', field: 'average_webinar_registar', instance: 'Number' })
declareVirtualField({ model: 'adminDashboard', field: 'webinars_replayed_count', instance: 'Number' })
declareVirtualField({ model: 'adminDashboard', field: 'groups_count', instance: 'Number' })
declareVirtualField({ model: 'adminDashboard', field: 'group_active_members_count', instance: 'Number' })
declareVirtualField({ model: 'adminDashboard', field: 'average_group_answers', instance: 'Number' })
declareVirtualField({ model: 'adminDashboard', field: 'messages_count', instance: 'Number' })
declareVirtualField({ model: 'adminDashboard', field: 'users_count', instance: 'Number' })
declareVirtualField({ model: 'adminDashboard', field: 'active_users_count', instance: 'Number' })
declareVirtualField({ model: 'adminDashboard', field: 'leads_count', instance: 'Number' })
declareVirtualField({ model: 'adminDashboard', field: 'users_men_count', instance: 'Number' })
declareVirtualField({ model: 'adminDashboard', field: 'user_women_count', instance: 'Number' })
declareVirtualField({ model: 'adminDashboard', field: 'users_no_gender_count', instance: 'Number' })
declareVirtualField({ model: 'adminDashboard', field: 'started_coachings', instance: 'Number' })
declareVirtualField({
  model: 'adminDashboard', field: `specificities_users`, instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'graphData' }
  },
})
declareVirtualField({
  model: 'adminDashboard', field: `reasons_users`, instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'graphData' }
  },
})

declareEnumField({ model: 'foodDocument', field: 'type', enumValues: FOOD_DOCUMENT_TYPE })
declareVirtualField({ model: 'foodDocument', field: 'url', type: 'String', requires: 'manual_url,document' })

declareVirtualField({
  model: 'quizz', field: 'questions', instance: 'company', multiple: false,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'quizzQuestion' }
  },
})
declareEnumField({ model: 'quizz', field: 'type', enumValues: QUIZZ_TYPE })

declareEnumField({ model: 'quizzQuestion', field: 'type', enumValues: QUIZZ_QUESTION_TYPE })
declareVirtualField({
  model: 'quizzQuestion', field: 'available_answers', instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'item' }
  },
})

declareVirtualField({
model: 'appointment', field: 'order', instance: 'Number',
requires: 'coaching.appointments',
})
declareVirtualField({
  model: 'appointment', field: 'status', instance: 'String',
  requires: 'start_date,end_date', enumValues: APPOINTMENT_STATUS,
})

declareVirtualField({
  model: 'userQuizzQuestion', field: 'order', instance: 'Number',
  requires: 'userQuizz.questions',
})
declareVirtualField({
  model: 'userQuizzQuestion', field: 'multiple_answers',
  instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'item' }
  },
})
declareVirtualField({
  model: 'userQuizzQuestion', field: 'answer_status', instance: 'String',
  requires: 'single_enum_answer,quizz_question.correct_answer', enumValues: ANSWER_STATUS,
})
declareVirtualField({
  model: 'userQuizzQuestion', field: 'answer_message', instance: 'String',
  requires: 'answer_status,quizz_question.success_message,quizz_question.error_message'
})


declareEnumField({ model: 'userQuizz', field: 'type', enumValues: QUIZZ_TYPE })

declareVirtualField({ model: 'range', field: 'day', instance: 'Date', requires: 'start_date' })
declareVirtualField({
  model: 'range', field: 'range_str', instance: 'String',
  requires: 'start_date,end_date',
})
declareVirtualField({
  model: 'range', field: 'duration', instance: 'String',
  requires: 'appointment_type',
})
declareVirtualField({
  model: 'range', field: 'end_date', instance: 'String',
  requires: 'start_date,duration',
})

declareVirtualField({
  model: 'lead', field: 'fullname', instance: 'String',
  requires: 'firstname,lastname',
})
declareVirtualField({
  model: 'lead', field: 'company',
  instance: 'Company', multiple: false,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'company' }
  },
})
declareEnumField({ model: 'lead', field: 'call_status', enumValues: CALL_STATUS })
declareVirtualField({
  model: 'lead', field: 'job',
  instance: 'job', multiple: false,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'job' }
  },
})
declareVirtualField({
  model: 'lead', field: 'declineReason',
  instance: 'declineReason', multiple: false,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'declineReason' }
  },
})
declareVirtualField({
  model: 'lead', field: 'joinReason',
  instance: 'joinReason', multiple: false,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'joinReason' }
  },
})
declareEnumField({ model: 'lead', field: 'call_direction', enumValues: CALL_DIRECTION })
declareVirtualField({
  model: 'lead', field: 'registered_user',
  instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: { ref: 'user' }
  },
})
declareVirtualField({
  model: 'lead', field: 'registered', instance: 'Boolean',
  requires: 'registered_user',
})
declareEnumField({ model: 'lead', field: 'coaching_converted', enumValues: COACHING_CONVERSION_STATUS })

declareVirtualField({
  model: 'nutritionAdvice', field: 'end_date', instance: 'Date',
  requires: 'start_date,duration',
})



const getDataLiked = (userId, params, data) => {
  const liked = data?.likes?.some(l => idEqual(l._id, userId))
  return Promise.resolve(liked)
}

const setDataLiked = ({ id, attribute, value, user }) => {
  return getModel(id, ['comment', 'message', 'content'])
    .then(model => {
      if (value) {
        // Set liked
        return mongoose.models[model].findByIdAndUpdate(id, { $addToSet: { likes: user._id } })
      }

      // Remove liked
      return mongoose.models[model].findByIdAndUpdate(id, { $pullAll: { likes: [user._id] } })

    })
}

const getDataPinned = (userId, params, data) => {
  const pinned = data?.pins?.some(l => idEqual(l._id, userId))
  return Promise.resolve(pinned)
}

const setDataPinned = ({ id, attribute, value, user }) => {
  return getModel(id, ['message', 'content'])
    .then(model => {
      if (value) {
        // Set liked
        return mongoose.models[model].findByIdAndUpdate(id, { $addToSet: { pins: user._id } })
      }

      // Remove liked
      return mongoose.models[model].findByIdAndUpdate(id, { $pullAll: { pins: [user._id] } })

    })
}

const getPinnedMessages = (userId, params, data) => {
  return Promise.resolve(data.messages?.filter(m => m.pins?.some(p => idEqual(p._id, userId))))
}

const getMenuShoppingList = (userId, params, data) => {
  console.log(params)
  const people_count = parseInt(params.people_count) || MENU_PEOPLE_COUNT
  const ratio = people_count / MENU_PEOPLE_COUNT
  const ingredients = lodash.flatten(data?.recipes.map(r => r.recipe?.ingredients).filter(v => !!v))
  const ingredientsGroup = lodash.groupBy(ingredients, i => i.ingredient._id)
  const result = lodash(ingredientsGroup)
    .mapValues(ingrs => ({ ingredient: ingrs[0].ingredient, quantity: lodash.sumBy(ingrs, 'quantity') * ratio }))
    .values()
    .map(({ ingredient, quantity }) => {
      const [newQuantity, newUunit] = convertQuantity(quantity, ingredient.unit)
      return ({
        ingredient: { ...ingredient, unit: newUunit },
        quantity: parseInt(newQuantity * 100) / 100,
      })
    })
    .value()
  return Promise.resolve(result)
}

const getUserKeySpoonsStr = (userId, params, data) => {
  return getUserKeySpoons(userId, params, data)
    .then(count => {
      return `${count} cuillère${count > 1 ? 's' : ''}`
    })
}

const getUserSurveysProgress = (userId, params, data) => {
  // Get max possible answer
  const maxAnswer = lodash.maxBy(Object.keys(SURVEY_ANSWER), v => parseInt(v))
  return UserSurvey.find({ user: userId })
    .sort({ [CREATED_AT_ATTRIBUTE]: -1 })
    .populate({ path: 'questions', populate: { path: 'question' } })
    .lean({ virtuals: true })
    // Keep surveys questions depending on current ky (==data)
    // TODO: try to filter in populate section above
    .then(surveys => surveys.map(s => ({ ...s, questions: s.questions.filter(q => idEqual(q.question.key, data._id)) })))
    // Keep surveys having still questions
    .then(surveys => surveys.filter(s => !lodash.isEmpty(s.questions)))
    // Keep questions progress
    .then(surveys => surveys.map(s => ({
      date: s[CREATED_AT_ATTRIBUTE],
      value_1: (lodash.sumBy(s.questions, q => parseInt(q.answer) || 0) * 100.0 / (s.questions.length * maxAnswer)),
    })))
}

const getUserContents = async (userId, params, data) => {
  const user=await User.findById(data._id)
  const user_targets = lodash([user.objective_targets, user.health_targets,
    user.activity_target, user.specificity_targets, user.home_target])
    .flatten()
    .filter(v => !!v)
    .map(t => t._id)
    .value()
  return Content.find({targets: {$in: user_targets}})
}

const getUserPassedChallenges = (userId, params, data) => {
  return User.findById(userId, 'passed_events')
    .populate({ path: 'passed_events', match: { "__t": "individualChallenge", key: data._id } })
    .then(res => {
      return res.passed_events?.length || 0
    })
}

const getUserPassedWebinars = (userId, params, data) => {
  return User.findById(userId, 'passed_events')
    .populate({ path: 'passed_events', match: { "__t": "webinar", key: data._id } })
    .then(res => {
      return res.passed_events?.length || 0
    })
}

const getDietPatients = (userId, params, data) => {
  const limit=parseInt(params['limit.diet_patients']) || Number.MAX_SAFE_INTEGER-1
  const page=parseInt(params['page.diet_patients']) || 0
  return Coaching.distinct('user', {diet: userId})
    .then(users => User.find({_id: users}).skip(page*limit).limit(limit+1).populate('company'))
}

const getDietPatientsCount = (userId, params, data) => {
  return Coaching.distinct('user', {diet: userId})
    .then(users => users.length)
}

const getDietAppointments = (userId, params, data) => {
  const limit=parseInt(params['limit.diet_appointments']) || Number.MAX_SAFE_INTEGER-1
  const page=parseInt(params['page.diet_appointments']) || 0
  const now=moment()
  return Coaching.find({diet: userId}, {_id:1})
    .then(coachings => Appointment.find({coaching: coachings})
      .skip(page*limit)
      .limit(limit+1)
      .populate({path: 'coaching', populate: {path: 'user', populate: 'company'}})
    )
}

const getDietAppointmentsCount = (userId, prams, data) => {
  return Coaching.find({diet: userId}, {_id:1})
    .then(coachings => Appointment.countDocuments({coaching: coachings}))
}

const getDietCurrentFutureAppointments = (userId, params, data) => {
  const limit=parseInt(params['limit.diet_current_future_appointments']) || Number.MAX_SAFE_INTEGER
  const page=parseInt(params['page.diet_current_future_appointments']) || 0
  const now=moment()
  return Coaching.find({diet: userId}, {_id:1})
    .then(coachings => Appointment.find({coaching: coachings, end_date: {$gt: now}})
      .skip(page*limit)
      .limit(limit+1)
      .populate({path: 'coaching', select: {_id:1}, populate: {path: 'user', populate: 'company'}})
    )
}

declareComputedField({model: 'user', field: 'contents', getterFn: getUserContents})
declareComputedField({model: 'loggedUser', field: 'contents', getterFn: getUserContents})
declareComputedField({model: 'user', field: 'diet_patients', getterFn: getDietPatients})
declareComputedField({model: 'loggedUser', field: 'diet_patients', getterFn: getDietPatients})
declareComputedField({model: 'user', field: 'diet_patients_count', getterFn: getDietPatientsCount})
declareComputedField({model: 'loggedUser', field: 'diet_patients_count', getterFn: getDietPatientsCount})
declareComputedField({model: 'user', field: 'diet_appointments', getterFn: getDietAppointments})
declareComputedField({model: 'loggedUser', field: 'diet_appointments', getterFn: getDietAppointments})
declareComputedField({model: 'user', field: 'diet_appointments_count', getterFn: getDietAppointmentsCount})
declareComputedField({model: 'loggedUser', field: 'diet_appointments_count', getterFn: getDietAppointmentsCount})
declareComputedField({model: 'user', field: 'diet_current_future_appointments', getterFn: getDietCurrentFutureAppointments})
declareComputedField({model: 'loggedUser', field: 'diet_current_future_appointments', getterFn: getDietCurrentFutureAppointments})
declareComputedField({model: 'comment', field: 'liked', getterFn: getDataLiked, setterFn: setDataLiked})
declareComputedField({model: 'message', field: 'liked', getterFn: getDataLiked, setterFn: setDataLiked})
declareComputedField({model: 'content', field: 'liked', getterFn: getDataLiked, setterFn: setDataLiked})
declareComputedField({model: 'message', field: 'pinned', getterFn: getDataPinned, setterFn: setDataPinned})
declareComputedField({model: 'content', field: 'pinned', getterFn: getDataPinned, setterFn: setDataPinned})
declareComputedField({model: 'group', field: 'pinned_messages', getterFn: getPinnedMessages})
declareComputedField({model: 'individualChallenge', field: 'trophy_picture', getterFn: getUserIndChallengeTrophy})
declareComputedField({model: 'individualChallenge', field: 'obtained', getterFn: getObtainedTrophy})
declareComputedField({model: 'key', field: 'trophy_picture', getterFn: getUserKeyTrophy})
declareComputedField({model: 'key', field: 'user_spoons', getterFn: getUserKeySpoons})
declareComputedField({model: 'key', field: 'user_spoons_str', getterFn: getUserKeySpoonsStr})
declareComputedField({model: 'key', field: 'user_progress', getterFn: getUserKeyProgress})
declareComputedField({model: 'key', field: 'user_read_contents', getterFn: getUserKeyReadContents})
declareComputedField({model: 'key', field: 'user_passed_challenges', getterFn: getUserPassedChallenges})
declareComputedField({model: 'key', field: 'user_passed_webinars', getterFn: getUserPassedWebinars})
declareComputedField({model: 'user', field: 'spoons_count', getterFn: getUserSpoons})
declareComputedField({model: 'loggedUser', field: 'spoons_count', getterFn: getUserSpoons})
declareComputedField({model: 'menu', field: 'shopping_list', getterFn: getMenuShoppingList})
declareComputedField({model: 'key', field: 'user_surveys_progress', getterFn: getUserSurveysProgress})


const postCreate = ({ model, params, data, user }) => {
  // Create company => duplicate offer
  if (model == 'company') {
    return Offer.findById(params.offer)
      .then(offer => Offer.create({ ...simpleCloneModel(offer), company: data._id }))
      .then(offer => data)
  }
  if (model == 'collectiveChallenge') {
    return Pip.find()
      .then(pips => Promise.all(pips.map(p => ChallengePip.create({ pip: p, collectiveChallenge: data }))))
      .then(() => {
        ensureChallengePipsConsistency()
        return data
      })
  }
  if (model == 'pip') {
    ensureChallengePipsConsistency()
  }
  if (model == 'teamMember') {
    ensureChallengePipsConsistency()
  }
  if (model == 'coaching') {
    return CoachingQuestion.find()
      .then(questions => Promise.all(questions.map(question => userCoachingQuestion.create({ coaching: data, question }))))
  }

  if (['loggedUser', 'user'].includes(model) && data.role == ROLE_CUSTOMER) {
    return Coaching.create({ user: data })
      .then(coaching => User.findByIdAndUpdate(data._id, { coaching }))
  }
  if (['user'].includes(model) && data.role == ROLE_EXTERNAL_DIET) {
    return Promise.allSettled([
      sendDietPreRegister2Diet({ user: data }),
      User.find({ role: { $in: [ROLE_ADMIN, ROLE_SUPER_ADMIN] } })
        .then(admins => Promise.allSettled(admins.map(admin => sendDietPreRegister2Admin({ user: data, admin }))))
    ])
      .then(() => data)
  }
  // Create coaching.progress if not present
  if (model == 'appointment') {
    const setProgressQuizz = Coaching.findById(data.coaching._id).populate('user')
      .then(coaching => {
        /** If lead exists: 
         * - if user is an operator, set coaching conversion status to TO_COME
         * - if any user and lead is coaching cancelled, set status to TO_COME
        */
        const isOperator = user.role == ROLE_SUPPORT
        const statusFilter = isOperator ? {} : { coaching_converted: COACHING_CONVERSION_CANCELLED }
        Lead.findOneAndUpdate(
          { email: coaching.user.email, ...statusFilter },
          { coaching_converted: COACHING_CONVERSION_TO_COME },
          { new: true, runValidators: true }
        )
          .then(console.log)
          .catch(console.error)
        if (coaching.progress) {
          return data
        }
        return Quizz.findOne({ type: QUIZZ_TYPE_PROGRESS }).populate('questions')
          .then(q => {
            if (!q) { return console.error(`No progress quizz found`) }
            return q.cloneAsUserQuizz()
          })
          .then(uq => { coaching.progress = uq?._id; return coaching.save() })
          .then(() => data)
      })

    const createSmartagendaAppointment = Appointment.findById(data._id)
      .populate({ path: 'coaching', populate: ['user', 'diet'] })
      .populate('appointment_type')
      .then(appt => {
        return createAppointment(appt.coaching.diet.smartagenda_id, appt.coaching.user.smartagenda_id,
          appt.appointment_type.smartagenda_id, appt.start_date, appt.end_date)
          .then(smart_appt => {
            appt.smartagenda_id = smart_appt.id;
            return getAppointmentVisioLink(smart_appt.id)
          })
          .then(url => {
            appt.visio_url = url
            return appt.save()
          })
      })
    return Promise.allSettled([setProgressQuizz, createSmartagendaAppointment])
      .then(console.log)
      .catch(console.error)
      .finally(() => data)
  }

  // If operator created nuttrition advice, set lead nutrition converted
  if (model == 'nutritionAdvice' && user.role == ROLE_SUPPORT) {
    Coaching.findById(data.coaching._id).populate('user')
      .then(({ user }) => Lead.findOneAndUpdate({ email: user.email }, { nutrition_converted: true }))
      .then(res => `Nutrition conversion:${res}`)
      .catch(err => `Nutrition conversion:${err}`)
  }
  return Promise.resolve(data)
}

setPostCreateData(postCreate)

const postDelete = ({ model, data }) => {
  if (model == 'appointment') {
    deleteAppointment(data.smartagenda_id)
  }
}

setPostDeleteData(postDelete)

const ensureChallengePipsConsistency = () => {
  // Does every challenge have all pips ?
  return Promise.all([Pip.find({}, "_id"), CollectiveChallenge.find({}, "_id"),
  TeamMember.find().populate('team'), ChallengeUserPip.find()])
    .then(([pips, challenges, teamMembers, challengeUserPips]) => {
      // Ensure all challenge pips exist
      const updateChallengePips = lodash.product(pips, challenges)
        .map(([pip, challenge]) => ChallengePip.updateMany(
          { pip: pip, collectiveChallenge: challenge },
          { pip: pip, collectiveChallenge: challenge },
          { upsert: true }
        ))
      Promise.all(updateChallengePips)
        .then(res => {
          console.log(`Upsert challenge pips ok:${JSON.stringify(res)}`)
          // Ensure all team mebers pips exist
          const updateMembersPips = ChallengePip.find()
            .then(challengePips => {
              return teamMembers.map(member => {
                const pips = challengePips.filter(p => idEqual(p.collectiveChallenge, member.team.collectiveChallenge))
                return Promise.all(pips.map(p => {
                  return ChallengeUserPip.update(
                    { pip: p, user: member },
                    { pip: p, user: member },
                    { upsert: true }
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

const computeStatistics = async ({ id, fields }) => {
  console.log(`Computing stats for ${id} fields ${fields}`)
  if (!id) {
    return {}
  }
  const result={}
  const company=await Company.findById(id)
  result.company=id
  result.groups_count=await Group.countDocuments({companies: id})
  result.messages_count=lodash(await Group.find({companies: id}).populate('messages')).flatten().size()
  result.users_count=await User.countDocuments({company: id})
  result.user_women_count=await User.countDocuments({company: id, gender: GENDER_FEMALE})
  result.users_men_count=await User.countDocuments({company: id, gender: GENDER_MALE})
  result.users_no_gender_count=await User.countDocuments({company: id, gender: GENDER_NON_BINARY})
  result.webinars_count=await Webinar.countDocuments({companies: id})
  const webinars_replayed=(await User.aggregate([
    {$match: { company: id }},
    {$unwind: '$replayed_events'},
    {$match: { 'replayed_events.__t': EVENT_WEBINAR }},
    {$group: {_id: '$_id', webinarCount: { $sum: 1 }}}
  ]))[0]?.webinarCount||0
  result.webinars_replayed_count=webinars_replayed
  const webinars_registered=(await User.aggregate([
    {$match: { company: id }},
    {$unwind: '$registered_events'},
    {$match: { 'registered_events.__t': EVENT_WEBINAR }},
    {$group: {_id: '$_id', webinarCount: { $sum: 1 }}}
  ]))[0]?.webinarCount||0
  result.average_webinar_registar=result.webinars_count ? webinars_registered*1.0/result.webinars_count : 0
  const apptCoachings=await Appointment.distinct('coaching')
  const coachings=await Coaching.distinct('user', {_id: {$in: apptCoachings}})
  const users=await User.countDocuments({_id: {$in: coachings}, company: id})
  result.started_coachings=users
  result.leads_count=await Lead.countDocuments({company_code: company.code})
  return result
}

/** Upsert PARTICULARS company */
!isDevelopment() && Company.findOneAndUpdate(
  { name: PARTICULAR_COMPANY_NAME },
  { name: PARTICULAR_COMPANY_NAME, activity: COMPANY_ACTIVITY_SERVICES_AUX_ENTREPRISES },
  { upsert: true },
)
  .then(() => console.log(`Particular company upserted`))
  .catch(err => console.error(`Particular company upsert error:${err}`))

// Create missings coachings for any CUSTOMER
!isDevelopment() && User.find({ role: ROLE_CUSTOMER }).populate('coachings')
  .then(users => users.filter(user => lodash.isEmpty(user.coachings)))
  .then(users => Promise.all(users.map(user => Coaching.create({ user }))))
  .then(coachings => coachings.map(coaching => console.log(`Created missing coaching for ${coaching.user.email}`)))
  .catch(err => console.error(err))

// Ensure coaching logbooks consistency
const logbooksConsistency = coaching_id => {
  const idFilter = coaching_id ? { _id: coaching_id } : {}
  const startDay = moment().add(-1, 'day')
  const endDay = moment().add(1, 'days')
  const logBooksFilter = { $and: [{ day: { $gte: startDay.startOf('day') } }, { day: { $lte: endDay.endOf('day') } }] }
  return Coaching.find(idFilter).populate([
    { path: 'appointments', populate: { path: 'logbooks', populate: { path: 'questions' } } },
    { path: 'all_logbooks', match: logBooksFilter, populate: { path: 'logbook', populate: 'quizz' } },
  ])
    .then(coachings => {
      return Promise.all(coachings.map(coaching => {
        const getLogbooksForDay = date => {
          // Get the appontment juste before the date
          const previous_appt = lodash(coaching.appointments)
            .filter(a => a.end_date < date)
            .maxBy(a => a.start_date)
          const appt_logbooks = previous_appt ? [...previous_appt.logbooks] : []
          return Quizz.find({ type: QUIZZ_TYPE_LOGBOOK, default: true }).populate('questions')
            .then(defaultQuizzs => {
              appt_logbooks.push(...defaultQuizzs)
              return lodash.uniqBy(appt_logbooks, q => q._id.toString())
            })
        }
        const diff = endDay.diff(startDay, 'days')
        return Promise.all(lodash.range(diff).map(day_idx => {
          const day = moment(startDay).add(day_idx, 'day')
          // expected quizz templates
          return getLogbooksForDay(day)
            .then(expectedQuizz => {
              const coachingLogbooks = coaching.all_logbooks.filter(l => moment(l.day).isSame(day, 'day'))
              // Logbooks missing in patient's coaching
              const missingQuizz = expectedQuizz.filter(q => !coachingLogbooks.some(cl => idEqual(cl.logbook.quizz._id, q._id)))
              // Logbooks to remove from patient's coaching
              const extraQuizz = coachingLogbooks.filter(l => !expectedQuizz.some(q => idEqual(q._id, l.logbook.quizz._id)))
              // Add missing quizz
              return Promise.all(missingQuizz.map(q => q.cloneAsUserQuizz()))
                .then(quizzs => Promise.all(quizzs.map(q => CoachingLogbook.create({ day, logbook: q, coaching }))))
                // remove extra quizz
                .then(quizzs => Promise.all(extraQuizz.map(q => {
                  // Remove user quizz
                  q.logbook.delete()
                  // Remove coaching logbook
                  return q.delete()
                })))
            })
        }))
      }))

    })
}

const getRegisterCompany = props => {
  // No email : FUCK YOU
  if (!props.email) { return Promise.resolve({}) }
  const NO_COMPANY_NAME = 'NEVER'.repeat(10000)
  const code_re = props.company_code ? new RegExp(`^${props.company_code.replace(/[\t ]/g, '')}$`, 'i') : NO_COMPANY_NAME
  const mail_re = props.email
  const result = {}
  return Promise.all([Lead.findOne({ email: mail_re }), Company.findOne({ code: code_re })])
    .then(([lead, company]) => {
      console.log('mail', mail_re, 'lead', lead, 'company', company)
      // If company not found, get form lead company code if any
      if (!company && lead?.company_code) {
        return Promise.all([lead, Company.findOne({ code: lead.company_code })])
      }
      return [lead, company]
    })
    .then(([lead, company]) => {
      // Bad company code
      if (props.company_code && !company) {
        throw new NotFoundError(`Code entreprise ${props.company_code} inconnu`)
      }
      // lead code differs from company code
      if (lead?.company_code && company?.code && (lead.company_code != company.code)) {
        throw new BadRequestError(`Code entreprise incorrect, contactez un administrateur`)
      }
      // lead code differs from entered code
      if (lead?.company_code && props.company_code && (lead.company_code != props.company_code)) {
        throw new BadRequestError(`Code entreprise incorrect, contactez un administrateur`)
      }
      if (company?.code && lead?.company_code && (company.code == lead.company_code)) {
        // Code & lead match
        return ({ ...result, company: company._id })
      }
      // Code & lead match
      if (!company && !lead) {
        return ({ ...result })
      }

      if (company?.registration_integrity) {
        if (lead && !props.company_code) {
          return ({ ...result, registration_warning: REGISTRATION_WARNING_CODE_MISSING })
        }
        if (!lead) {
          return ({ ...result, registration_warning: REGISTRATION_WARNING_LEAD_MISSING })
        }
      }
      else {
        return ({ ...result, company: company._id })
      }
      return result
    })
}

setImportDataFunction({ model: 'lead', fn: importLeads })

// Ensure all spoon gains are defined
ensureSpoonGains = () => {
  return Object.keys(SPOON_SOURCE).map(source => {
    return SpoonGain.exists({ source })
      .then(exists => {
        if (!exists) {
          console.log(`Create missing spoon gain ${source} 0`)
          return SpoonGain.create({ source, gain: 0 })
        }
      })
  })
}

ensureSpoonGains()

// Ensure logbooks consistency each morning
//cron.schedule('0 */15 * * * *', async() => {
!isDevelopment() && cron.schedule('0 0 * * * *', async () => {
  logbooksConsistency()
    .then(() => console.log(`Logbooks consistency OK `))
    .catch(err => console.error(`Logbooks consistency error:${err}`))
})

// Synchronize diets & customer smartagenda accounts
!isDevelopment() && cron.schedule('0 * * * * *', () => {
  console.log(`Smartagenda accounts sync`)
  return User.find({ role: { $in: [ROLE_EXTERNAL_DIET, ROLE_CUSTOMER] }, smartagenda_id: null })
    .then(users => {
      return Promise.allSettled(users.map(user => {
        const getFn = user.role == ROLE_EXTERNAL_DIET ? getAgenda : getAccount
        return getFn({ email: user.email })
          .then(id => {
            if (id) {
              console.log(`User ${user.email}/${user.role} found in smartagenda with id ${id}`)
              user.smartagenda_id = id
              return user.save()
            }
            // Create only customers, not allowed to create diets through API
            else if (user.role == ROLE_CUSTOMER) {
              const attrs = lodash.pick(user, ['email', 'firstname', 'lastname'])
              return upsertAccount(attrs)
                .then(id => {
                  console.log(`User ${user.email}/${user.role} created in smartagenda under id ${id}`)
                  user.smartagenda_id = id
                  return user.save()
                })
                .catch(console.error)
            }
          })
          .catch(err => console.log(`User ${user.email}/${user.role} error ${err}`))
      }))
    })
})

const agendaHookFn = received => {
  // Check validity
  console.log(`Received hook ${JSON.stringify(received)}`)
  const { senderSite, action, objId, objClass, data: { obj: { presta_id, equipe_id, client_id, start_date_gmt, end_date_gmt, internet } } } = received
  const AGENDA_NAME = getSmartAgendaConfig().SMARTAGENDA_URL_PART
  if (AGENDA_NAME == senderSite && internet == "O") {
    return console.log(`Event coming for ourself: skipping`)
  }
  if (objClass != 'pdo_events') {
    throw new BadRequestError(`Received hook for model ${objClass} but only pdo_events is handled`)
  }
  if (action == HOOK_DELETE) {
    console.log(`Deleting appointment smartagenda_id ${objId}`)
    return Appointment.remove({ smartagenda_id: objId })
      .then(console.log)
      .catch(console.error)
  }
  if (action == HOOK_INSERT) {
    console.log(`Inserting appointment smartagenda_id ${objId}`)
    return Promise.all([
      User.findOne({ smartagenda_id: equipe_id, role: ROLE_EXTERNAL_DIET }),
      User.findOne({ smartagenda_id: client_id, role: ROLE_CUSTOMER }),
      AppointmentType.findOne({ smartagenda_id: presta_id }),
    ])
      .then(([diet, user, appointment_type]) => {
        if (!(diet && user && appointment_type)) {
          throw new Error(`Insert appointment missing info:${!!diet} ${!!user} ${!!appointment_type}`)
        }
        return Coaching.find({ user }).sort({ [CREATED_AT_ATTRIBUTE]: -1 })
          .then(coachings => {
            if (lodash.isEmpty(coachings)) {
              throw new Error(`No coaching defined`)
            }
            return Appointment.findOneAndUpdate(
              { smartagenda_id: objId },
              {
                coaching: coachings[0], appointment_type, smartagenda_id: objId,
                start_date: start_date_gmt, end_date: end_date_gmt
              },
              { upsert: true }
            )
          })
      })
  }
  if (action == HOOK_UPDATE) {
    console.log(`UPdateing appointment smartagenda_id ${objId}`)
    return Promise.all([
      Appointment.findOne({ smartagenda_id: objId }),
      AppointmentType.findOne({ smartagenda_id: presta_id }),
    ])
      .then(([appointment, appointment_type]) => {
        if (!(appointment && appointment_type)) {
          throw new Error(`Update appointment missing info:${!!appointment} ${!!appointment_type}`)
        }
        return Appointment.updateOne(
          { smartagenda_id: objId },
          { appointment_type, start_date: start_date_gmt, end_date: end_date_gmt }
        )
      })
  }
}

// Update workflows
cron.schedule('0 0 8 * * *', async () => {
  updateWorkflows()
    .then(console.log)
    .catch(console.error)
})

// Inactivity notifications
cron.schedule('0 0 8 * * *', async () => {
  const users = await User.find({ role: ROLE_CUSTOMER }, { email: 1, days_inactivity: 1, last_activity: 1 })
  // Inactivity notifications
  const DURATIONS = [[15, sendInactivity15], [30, sendInactivity30], [45, sendInactivity45]]
  DURATIONS.forEach(([duration, fn]) => {
    const selected = users.filter(u => u.days_inactivity == duration)
    selected.forEach(u => fn({ user: u }).catch(console.error))
  })
})

// Individual challenges notifications
cron.schedule('0 0 8 * * *', async () => {
  const users = await User.find({ role: ROLE_CUSTOMER }, { email: 1, registered_events: 1 })
    .populate({ path: 'registered_events', populate: { path: 'event', match: { __t: 'individualChallenge' } } })

  const hasChallengeStartedSince = (user, days) => {
    return user.registered_events.some(re => moment().diff(re.date, 'days') == days)
  }
  // Individual challenges
  const DURATIONS = [[1, sendIndChallenge1], [2, sendIndChallenge2], [3, sendIndChallenge3],
  [5, sendIndChallenge5], [6, sendIndChallenge6]]
  DURATIONS.forEach(([duration, fn]) => {
    const selected = users.filter(u => hasChallengeStartedSince(u, duration))
    selected.forEach(u => fn({ user: u }).catch(console.error))
  })
})

// New webinar for company
cron.schedule('0 0 8 * * *', async () => {
  const filter = { [CREATED_AT_ATTRIBUTE]: { $gte: moment().add(-1, 'day') } }
  const webinars = await Webinar.find(filter)
    .populate({ path: 'companies', populate: { path: 'users', match: { role: ROLE_CUSTOMER } } })
  webinars.forEach(webinar => {
    const users = lodash.flattenDeep(webinar.companies?.map(c => c.users))
    users.forEach(u => sendNewWebinar({ user: u, title: webinar.name, datetime: formatDateTime(webinar.start_date) }).catch(console.error))
  })
})

// Webinar in 3 days
cron.schedule('0 0 8 * * *', async () => {
  const filter = { start_date: { $gte: moment().add(3, 'day'), $lte: moment().add(4, 'day') } }
  const webinars = await Webinar.find(filter)
    .populate({ path: 'companies', populate: { path: 'users', match: { role: ROLE_CUSTOMER } } }).catch(console.error)
  webinars.forEach(webinar => {
    const users = lodash.flattenDeep(webinar.companies?.map(c => c.users))
    users.forEach(u => sendWebinarIn3Days({ user: u, title: webinar.name, datetime: formatDateTime(webinar.start_date) }).catch(console.error))
  })
})

// Staurdays reminders (1-4th in month)
cron.schedule('0 0 8 * * 6', async () => {
  const customers = await User.find({ role: ROLE_CUSTOMER })
  const saturdayIndex = Math.floor((moment().date() - 1) / 7) + 1
  const fn = { 1: sendSaturday1, 2: sendSaturday2, 3: sendSaturday3, 4: sendSaturday4 }[saturdayIndex]
  if (fn) {
    customers.forEach(customer => fn({ user: customer }).catch(console.error))
  }
})


/**
 * For each lead in coaching to come status, set to caohing converted
 * if his first appointment was today
 */
cron.schedule('0 0 1 * * *', async () => {
  const checkLead = email => {
    console.log(`Checking lead ${email} coaching conversion status`)
    return User.findOne({ email })
      .populate({ path: 'coachings', populate: 'appointments' })
      .then(user => {
        const appts = lodash(user?.coachings?.map(coaching => coaching.appointments)).flattenDeep().value()
        if (appts.length == 1 && moment(appts[0].start_date).isSame(moment(), 'day')) {
          return Lead.findOneAndUpdate({ email }, { coaching_converted: COACHING_CONVERSION_CONVERTED })
        }
        return Promise.resolve(false)
      })
      .then(res => !!res && `Lead ${email} coaching converted` || '')
  }
  return Lead.find({ coaching_converted: COACHING_CONVERSION_TO_COME })
    .then(leads => Promise.all(leads.map(lead => checkLead(lead.email))))
    .then(console.log)
    .catch(console.error)
})

module.exports = {
  ensureChallengePipsConsistency,
  logbooksConsistency,
  getRegisterCompany,
  agendaHookFn,
  computeStatistics,
}
