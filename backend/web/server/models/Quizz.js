const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')
const Content = require(`./Content`)

let QuizzSchema=null

try {
  QuizzSchema=require(`../plugins/${getDataModel()}/schemas/QuizzSchema`)
  QuizzSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

// TODO: conflict bewteen smartdiet and klesia for content/quizz
let Quizz=null
if (QuizzSchema) {
  Quizz=getDataModel()=='klesia' ? Content.discriminator('quizz', QuizzSchema) : mongoose.model('quizz', QuizzSchema)
}

module.exports = Quizz
