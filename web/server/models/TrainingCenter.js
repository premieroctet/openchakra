const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let TrainingCenterSchema=null

try {
  TrainingCenterSchema=require(`./${getDataModel()}/TrainingCenterSchema`)
}
catch(err) {
  TrainingCenterSchema=null
}

TrainingCenterSchema?.plugin(mongooseLeanVirtuals)
module.exports = TrainingCenterSchema ? mongoose.model('trainingCenter', TrainingCenterSchema) : null
