const mongoose = require('mongoose')
const AddressSchema = require('../AddressSchema')

const Schema = mongoose.Schema

const TraineeSessionSchema = new Schema({
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
  resources_status: [{
    resource: {
      type: Schema.Types.ObjectId,
      ref: 'session',
      required: true,
    },
    progress: {
      Type: Number,
      default: 0,
    },
    time_spent: {
      Type: Number,
      default: 0,
    }
  }],
}, {
  toJSON: {
    virtuals: true,
    getters: true
  }
})

module.exports = TraineeSessionSchema
