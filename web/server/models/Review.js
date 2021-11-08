const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  content: {
    type: String,
  },
  note_alfred: {
    prestation_quality: {
      type: Number,
      max: 5,
      min: 0,
    },
    quality_price: {
      type: Number,
      max: 5,
      min: 0,
    },
    relational: {
      type: Number,
      max: 5,
      min: 0,
    },
    global: {
      type: Number,
      max: 5,
      min: 0,
    },
    careful: { // Travail soigné
      type: Boolean,
    },
    punctual: { // Ponctuel
      type: Boolean,
    },
    flexible: {
      type: Boolean,
    },
    reactive: { // Réactif
      type: Boolean,
    },
  },
  note_client: {
    reception: {
      type: Number,
      max: 5,
      min: 0,
    },
    accuracy: {
      type: Number,
      max: 5,
      min: 0,
    },
    relational: {
      type: Number,
      max: 5,
      min: 0,
    },
    global: {
      type: Number,
      max: 5,
      min: 0,
    },
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  serviceUser: {
    type: Schema.Types.ObjectId,
    ref: 'ServiceUser',
  },
  alfred: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = ReviewSchema
