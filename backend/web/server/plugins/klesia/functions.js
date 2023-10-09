const {
  declareEnumField,
  declareVirtualField,
  setPreCreateData,
  setPreprocessGet,
} = require('../../utils/database')
const {CONTENT_TYPE, QUESTION_TYPE, SEASON}=require('./consts')

const preprocessGet = ({model, fields, id, user, params}) => {
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
  if (['article', 'quizz', 'module', 'bestPractices', 'emergency', 'tip']) {
    params.creator=user
  }
  return Promise.resolve({model, params})
}

setPreCreateData(preCreate)


declareVirtualField({model: 'category', field: 'media', instance: 'String',
  requires: 'internal_media,external_media',
})

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
  declareEnumField({model: alias, field: 'season', enumValues: SEASON})
})

const ARTICLES_ALIASES=['stepsContainer', 'bestPractices', 'emergency']
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

declareVirtualField({model: 'quizz', field: 'questions',
  instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'question'}},
})

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
