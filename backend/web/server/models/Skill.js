const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let SkillSchema=null

try {
  SkillSchema=require(`../plugins/${getDataModel()}/schemas/SkillSchema`)
  SkillSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = SkillSchema ? mongoose.model('skill', SkillSchema) : null
