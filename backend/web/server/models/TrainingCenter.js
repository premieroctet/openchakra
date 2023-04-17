const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let TrainingCenterSchema=null

try {
  TrainingCenterSchema=require(`../plugins/${getDataModel()}/schemas/TrainingCenterSchema`)
  TrainingCenterSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = TrainingCenterSchema ? mongoose.model('trainingCenter', TrainingCenterSchema) : null
