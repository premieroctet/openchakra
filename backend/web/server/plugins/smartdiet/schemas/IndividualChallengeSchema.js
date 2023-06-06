const {
  EVENT_DISCRIMINATOR,
  EVENT_IND_CHALLENGE,
  HARDNESS
} = require('../consts')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const IndividualChallengeSchema = new Schema({
  hardness: {
    type: String,
    enum: Object.keys(HARDNESS),
    required: [true, 'Le niveau de difficulté est requis'],
  },
  trick: {
    type: String,
    required: [true, 'L\'astuce est obligatoire'],
  },
  success_message: {
    type: String,
    required: [true, 'Le message de succès est obligatoire'],
  },
  fail_message: {
    type: String,
    required: [true, "Le message d'échec' est obligatoire"],
  },
  trophy_on_picture: {
    type: String,
    required: [true, "L'illustration de trophée obtenu est obligatoire"],
  },
  trophy_off_picture: {
    type: String,
    required: [true, "L'illustration de trophée non obtenu est obligatoire"],
  },
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

IndividualChallengeSchema.virtual('type').get(function() {
  return EVENT_IND_CHALLENGE
})

IndividualChallengeSchema.virtual('trophy_picture').get(function() {
  return ''
})

module.exports = IndividualChallengeSchema
