const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const {
  EVENT_DISCRIMINATOR,
  HARDNESS
} = require('../consts')

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

module.exports = IndividualChallengeSchema
