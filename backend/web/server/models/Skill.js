const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

let SkillSchema=null

try {
  SkillSchema=require(`../plugins/${getDataModel()}/schemas/SkillSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

SkillSchema?.plugin(mongooseLeanVirtuals)

module.exports = SkillSchema ? mongoose.model('skill', SkillSchema) : null
