const moment = require('moment');
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SessionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
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
  themes: [{
    type: Schema.Types.ObjectId,
    ref: 'theme',
    required: true,
  }],
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

SessionSchema.virtual('status').get(function() {
  return moment()>this.end_date ? 'Terminée': 'En cours'
})

module.exports = SessionSchema
