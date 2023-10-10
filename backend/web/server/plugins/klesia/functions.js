const {
  declareEnumField,
  declareVirtualField,
  setPreCreateData,
  setPreprocessGet,
} = require('../../utils/database')
const {CONTENT_TYPE, QUESTION_TYPE, SEASON}=require('./consts')

const preprocessGet = ({model, fields, id, user /** params */}) => {
  if (model=='loggedUser') {
    model='user'
    id = user?._id || 'INVALIDID'
  }
  return Promise.resolve({model, fields, id})
}

setPreprocessGet(preprocessGet)

const preCreate = ({model, params, user}) => {
  if (model=='content') {
    model=params.type
    params.type=undefined
  }
  if (['article', 'quizz', 'module', 'bestPractices', 'emergency', 'tip'].includes(model)) {
    params.creator=user
  }
  if (model=='question') {
    params.quizz=params.parent
  }
  if (model=='step') {
    params.container=params.parent
  }
  if (model=='answer') {
    params.question=params.parent
  }
  return Promise.resolve({model, params})
}

setPreCreateData(preCreate)

const USER_ALIASES=['user', 'loggedUser']
USER_ALIASES.forEach(alias => {
  declareVirtualField({model: alias, field: 'fullname', instance: 'String'})
  declareVirtualField({model: alias, field: 'password2', instance: 'String'})
})

const CONTENT_ALIASES=['content', 'module', 'article', 'bestPractices', 'emergency', 'tip', 'quizz']
CONTENT_ALIASES.forEach(alias => {
  declareVirtualField({model: alias, field: 'media', instance: 'String',
    requires: 'internal_media,external_media',
  })
  declareVirtualField({model: alias, field: 'thumbnail', instance: 'String',
    requires: 'internal_thumbnail,external_thumbnail',
  })
  declareVirtualField({model: alias, field: 'type', instance: 'String', enumValues: CONTENT_TYPE})
  declareEnumField({model: alias, field: 'season', instance: 'String', enumValues: SEASON})
  declareVirtualField({model: alias, field: 'extra_info', instance: 'String'})
})

const ARTICLES_ALIASES=['bestPractices', 'emergency']
ARTICLES_ALIASES.forEach(alias => {
  declareVirtualField({model: alias, field: 'steps',
    instance: 'Array', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'step'}},
  })
})

declareVirtualField({model: 'question', field: 'available_answers',
  instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'answer'}},
})
declareEnumField({model: 'question', field: 'type', enumValues: QUESTION_TYPE})
declareVirtualField({model: 'question', field: 'user_choice_answers',
  instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'answer'}},
})
declareVirtualField({model: 'question', field: 'user_text_answer', instance: 'String'})
declareVirtualField({model: 'question', field: 'user_numeric_answer', instance: 'Number'})
declareVirtualField({model: 'question', field: 'correct', instance: 'Boolean', requires:'user_choice_answers,user_text_answer,user_numeric_answer,type,correct_answer'})
declareVirtualField({model: 'question', field: 'message', instance: 'String', requires:'correct,success_message,error_message'})

declareVirtualField({model: 'quizz', field: 'questions',
  instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'question'}},
})
declareVirtualField({model: 'quizz', field: 'percent_success', instance: 'Number', requires:'question.correct'})
declareVirtualField({model: 'quizz', field: 'percent_message', instance: 'String', requires:'percent_success,message_under_33,message_under_66,message_under_100,message_100'})

declareVirtualField({model: 'category', field: 'children',
  instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'category'}},
})
declareVirtualField({model: 'category', field: 'contents',
  instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'content'}},
})
declareVirtualField({model: 'category', field: 'media', instance: 'String',
  requires: 'internal_media,external_media',
})


declareVirtualField({model: 'module', field: 'contents_count',
  instance: 'Number', requires: 'contents'})
