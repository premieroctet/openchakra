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
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

IndividualChallengeSchema.virtual('type').get(function() {
  return EVENT_IND_CHALLENGE
})

module.exports = IndividualChallengeSchema
