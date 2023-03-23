const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const { HOME_STATUS, EVENT_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const EventSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  start_date: {
    type: Date,
    required: [true, 'La date de début est obligatoire'],
  },
  end_date: {
    type: Date,
    required: [true, 'La date de fin est obligatoire'],
  },
  type: {
    type: String,
    enum: Object.keys(EVENT_TYPE),
    required: [true, 'Le type est obligatoire'],
  },
  registered_by: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  // Users who refused the challenge
  refused_by: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  key: [{
    type: Schema.Types.ObjectId,
    ref: 'key',
  }],
}, schemaOptions)

module.exports = EventSchema
