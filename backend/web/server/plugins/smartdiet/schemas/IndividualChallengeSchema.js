const {
  EVENT_COLL_CHALLENGE,
  EVENT_DISCRIMINATOR,
  EVENT_TYPE,
  HARDNESS
} = require('../consts')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const IndividualChallengeSchema = new Schema({
  type: {
    type: String,
    enum: Object.keys(EVENT_TYPE),
    default: EVENT_IND_CHALLENGE,
    set: () => EVENT_IND_CHALLENGE,
    required: [true, 'Le type est obligatoire'],
  },
  hardness: {
    type: String,
    enum: Object.keys(HARDNESS),
    required: [true, 'Le niveau de difficulté est requis'],
  },
  trick: {
    type: String,
    required: [true, 'L\'astuce est obligatoire'],
  },
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

module.exports = IndividualChallengeSchema
