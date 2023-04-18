const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let RecommandationSchema=null

try {
  RecommandationSchema=require(`../plugins/${getDataModel()}/schemas/RecommandationSchema`)
  RecommandationSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = RecommandationSchema ? mongoose.model('recommandation', RecommandationSchema) : null
