const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let TraineeThemeSchema=null

try {
  TraineeThemeSchema=require(`./${getDataModel()}/TraineeThemeSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  TraineeThemeSchema=require(`./others/TraineeThemeSchema`)
}

TraineeThemeSchema?.plugin(mongooseLeanVirtuals)
module.exports = TraineeThemeSchema ? mongoose.model('traineeTheme', TraineeThemeSchema) : null
