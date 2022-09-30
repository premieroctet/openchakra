const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ModuleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  program: {
    type: Schema.Types.ObjectId,
    ref: 'program',
    required: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'trainingCenter',
    required: true,
  },
  trainers: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }],
  trainees: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }],
}, {toJSON: {virtuals: true, getters: true}})

module.exports = ModuleSchema
