const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionSchema = new Schema({
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
},
{toJSON: {virtuals: true, getters: true},
})

SessionSchema.virtual('trainees_count').get(function() {
  return this.trainees?.length || 0
})

SessionSchema.virtual('trainers_count').get(function() {
  return this.trainers?.length || 0
})

module.exports = SessionSchema
