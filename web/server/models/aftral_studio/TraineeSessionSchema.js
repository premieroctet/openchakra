const mongoose = require('mongoose')
const AddressSchema = require('../AddressSchema')

const Schema = mongoose.Schema

const TraineeSessionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  trainee: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: 'session',
    required: true,
  },
  themes: [{
    type: Schema.Types.ObjectId,
    ref: 'traineeTheme',
    required: true,
  }],
}, {
  toJSON: {
    virtuals: true,
    getters: true
  }
})
module.exports = TraineeSessionSchema
