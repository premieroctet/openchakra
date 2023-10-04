const {
  declareEnumField,
  declareVirtualField,
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


declareVirtualField({model: 'category', field: 'media', type: 'String',
  requires: 'internal_media,external_media',
})

const ALIASES=['content', 'module', 'article']
ALIASES.forEach(alias => {
  declareVirtualField({model: alias, field: 'media', type: 'String',
    requires: 'internal_media,external_media',
  })
  declareVirtualField({model: alias, field: 'thumbnail', type: 'String',
    requires: 'internal_thumbnail,external_thumbnail',
  })
  declareVirtualField({model: alias, field: 'type', type: 'String', enumValues: CONTENT_TYPE})
  declareEnumField({model: alias, field: 'season', enumValues: SEASON})
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

declareVirtualField({model: 'orderedArticles', field: 'articles',
  instance: 'Array', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'article'}},
})
