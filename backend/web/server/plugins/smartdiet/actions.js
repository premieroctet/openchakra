const UserSurvey = require('../../models/UserSurvey')
const UserQuestion = require('../../models/UserQuestion')
const Question = require('../../models/Question')
const mongoose = require('mongoose')
const { getModel, idEqual, loadFromDb } = require('../../utils/database')
const { BadRequestError } = require('../../utils/errors')
const { addAction, setAllowActionFn, ACTIONS } = require('../../utils/studio/actions')
const User = require('../../models/User')
const Group = require('../../models/Group')
const Company = require('../../models/Company')
const {PARTICULAR_COMPANY_NAME}=require('./consts')
const lodash=require('lodash')

const smartdiet_join_group = ({value, join}, user) => {
  return Group.findByIdAndUpdate(value, join ? {$addToSet: {users: user._id}} : {$pull: {users: user._id}})
    .then(() => Group.findById(value))
    .then(g => g._id)
}

addAction('smartdiet_join_group', smartdiet_join_group)

// skip, join or pass
const smartdiet_event = action => ({value}, user) => {
  return getModel(value, ['webinar', 'individualChallenge', 'menu', 'collectiveChallenge'])
    .then(model=> {
      const dbAction=action==
      'smartdiet_skip_event' ? {$addToSet: {skipped_events: value}, $pull: {registered_events: value, passed_events: value}}
      : action=='smartdiet_pass_event' ? {$addToSet: {passed_events: value}, $pull: {registered_events: value, skipped_events: value}}
      : action=='smartdiet_join_event' ? {$addToSet: {registered_events: value}, $pull: {passed_events: value, skipped_events: value}}
      : action=='smartdiet_start_event' ? {$addToSet: {registered_events: value}, $pull: {skipped_events: value}}
      : action=='smartdiet_fail_event' ? {$addToSet: {failed_events: value}, $pull: {registered_events: value}}
      :  null

      // Specific
      if (model=='webinar' && action=='smartdiet_start_event') {
        dbAction['$addToSet'].passed_events=value
      }

      if (!dbAction) {
        throw new Error(`Event subaction ${JSON.stringify(action)} unknown`)
      }

      return User.findByIdAndUpdate(user._id, dbAction)
        .then(() => mongoose.models[model].findById(value))
    })
}

['smartdiet_join_event','smartdiet_skip_event','smartdiet_pass_event','smartdiet_start_event', 'smartdiet_fail_event'].forEach(action => {
  addAction(action, smartdiet_event(action))
})

const defaultRegister=ACTIONS.register

const register=props => {
  // No compay => set the particular one
  if (!props.company) {
    return Company.findOne({name: PARTICULAR_COMPANY_NAME})
      .then(partCompany => defaultRegister({...props, company: partCompany._id}))
  }
  return defaultRegister(props)
}
addAction('register', register)

const setSmartdietCompanyCode = ({code}, user) => {
  return Company.findOne({code: code})
    .then(company => {
      if (!company) { throw new BadRequestError(`Code entreprise ${code} invalide`)}
      return User.findByIdAndUpdate(user._id, {company_code: code, company})
    })
}
addAction('smartdiet_set_company_code', setSmartdietCompanyCode)

const smartdietStartSurvey = (_, user) => {
  return Question.find({}).sort({order: 1})
    .then(questions => {
      if (lodash.isEmpty(questions)){throw new BadRequestError(`Aucun questionnaire n'est disponible`)}
      return UserSurvey.create({user})
        .then(survey => Promise.all(questions.map(question => UserQuestion.create({user, survey, question, order: question.order}))))
        .then(questions => lodash.minBy(questions, 'question.order'))
    })
}
addAction('smartdiet_start_survey', smartdietStartSurvey)

const smartdietNextQuestion = ({value}, user) => {
  return UserQuestion.findById(value).populate('question')
    .then(question => UserQuestion.findOne({survey: question.survey, order:question.order+1}))
}
addAction('smartdiet_next_question', smartdietNextQuestion)

const smartdietFinishSurvey = ({value}, user) => {
  return UserQuestion.findById(value).populate('question')
    .then(question => UserQuestion.exists({survey: question.survey, order:question.order+1}))
    .then(exists => {
      if (exists) { throw new BadRequestError(`Le questionnaire n'est pas terminé`)}
      return true
    })
}
addAction('smartdiet_finish_survey', smartdietFinishSurvey)


const isActionAllowed = ({action, dataId, user}) => {
  // TODO: why can we get "undefined" ??
  const promise=dataId && dataId!="undefined" ? getModel(dataId) : Promise.resolve(null)
  return promise
    .then(modelName => {
      if (action=='smartdiet_join_event') {
        return loadFromDb({model: 'user', id:user._id, fields:['failed_events', 'skipped_events',  'registered_events', 'passed_events', 'webinars'], user})
        .then(([user]) => {
          if (user?.skipped_events?.some(r => idEqual(r._id, dataId))) { return false}
          if (user?.registered_events?.some(r => idEqual(r._id, dataId))) { return false}
          if (user?.passed_events?.some(r => idEqual(r._id, dataId))) { return false}
          if (user?.failed_events?.some(r => idEqual(r._id, dataId))) { return false}
          return true
        })
      }
      if (action=='smartdiet_skip_event') {
        return loadFromDb({model: 'user', id:user._id, fields:['failed_events', 'skipped_events',  'registered_events', 'passed_events', 'webinars'], user})
        .then(([user]) => {
          if (modelName=='menu') { return false}
          if (user?.skipped_events?.some(r => idEqual(r._id, dataId))) { return false}
          if (user?.registered_events?.some(r => idEqual(r._id, dataId))) { return false}
          if (user?.passed_events?.some(r => idEqual(r._id, dataId))) { return false}
          if (user?.failed_events?.some(r => idEqual(r._id, dataId))) { return false}
          return true
        })
      }
      if (action=='smartdiet_start_event') {
        return loadFromDb({model: 'user', id:user._id, fields:['failed_events', 'skipped_events',  'registered_events', 'passed_events', 'webinars'], user})
        .then(([user]) => {
          if (modelName=='menu') { return false}
          if (modelName=='individualChallenge') {return false}
          if (user?.passed_events?.some(r => idEqual(r._id, dataId))) { return false}
          if (!user?.registered_events?.some(r => idEqual(r._id, dataId))) { return false}
          return true
        })
      }
      if (action=='smartdiet_pass_event') {
        return loadFromDb({model: 'user', id:user._id, fields:['failed_events', 'skipped_events',  'registered_events', 'passed_events', 'webinars'], user})
        .then(([user]) => {
          if (modelName=='menu') { return false}
          if (modelName=='webinar') { return false}
          if (user?.passed_events?.some(r => idEqual(r._id, dataId))) { return false}
          if (user?.skipped_events?.some(r => idEqual(r._id, dataId))) { return false}
          if (!user?.registered_events?.some(r => idEqual(r._id, dataId))) { return false}
          return true
        })
      }
      if (action=='smartdiet_fail_event') {
        return loadFromDb({model: 'user', id:user._id, fields:['failed_events', 'skipped_events',  'registered_events', 'passed_events', 'webinars'], user})
        .then(([user]) => {
          if (modelName=='menu') { return false}
          if (modelName=='webinar') { return false}
          if (user?.passed_events?.some(r => idEqual(r._id, dataId))) { return false}
          if (user?.skipped_events?.some(r => idEqual(r._id, dataId))) { return false}
          if (!user?.registered_events?.some(r => idEqual(r._id, dataId))) { return false}
          return true
        })
      }
      if (action=='smartdiet_next_question') {
        return UserQuestion.findById(dataId).populate('question').populate('survey')
          .then(question => {
            // Not answered question: no next
            if (lodash.isNil(question.answer)) { return false}
            return UserQuestion.findOne({survey: question.survey, order:question.order+1})
          })
      }
      if (action=='smartdiet_finish_survey') {
        return UserQuestion.findById(dataId).populate('question').populate('survey')
          .then(question => UserQuestion.exists({survey: question.survey, order:question.order+1}))
          .then(exists => !exists)
      }
      return Promise.resolve(true)
  })
}

setAllowActionFn(isActionAllowed)
