const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ProjectSchema=null

try {
  ProjectSchema=require(`../plugins/${getDataModel()}/schemas/ProjectSchema`)
  ProjectSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ProjectSchema ? mongoose.model('project', ProjectSchema) : null
