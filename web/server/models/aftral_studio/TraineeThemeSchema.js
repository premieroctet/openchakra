const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TraineeThemeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'traineeResource',
    required: false,
  }],
}, {toJSON: {virtuals: true, getters: true}})

module.exports = TraineeThemeSchema
