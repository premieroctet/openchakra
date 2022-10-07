const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let TraineeSessionSchema=null

try {
  TraineeSessionSchema=require(`./${getDataModel()}/TraineeSessionSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  TraineeSessionSchema=require(`./others/TraineeSessionSchema`)
}

TraineeSessionSchema?.plugin(mongooseLeanVirtuals)
module.exports = TraineeSessionSchema ? mongoose.model('traineeSession', TraineeSessionSchema) : null
