const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let TraineeResourceSchema=null

try {
  TraineeResourceSchema=require(`./${getDataModel()}/TraineeResourceSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  TraineeResourceSchema=require(`./others/TraineeResourceSchema`)
}

TraineeResourceSchema?.plugin(mongooseLeanVirtuals)
module.exports = TraineeResourceSchema ? mongoose.model('traineeResource', TraineeResourceSchema) : null
