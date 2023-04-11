const { EVENT_COLL_CHALLENGE, EVENT_TYPE, HOME_STATUS } = require('../consts')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const EventSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire'],
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
    validate: [v => v!=EVENT_COLL_CHALLENGE, 'Challenge collectif en BD doit être créé par le type CollectiveChallenge'],
    required: [true, 'Le type est obligatoire'],
  },
  // Users who registered
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
