const {
  EVENT_COLL_CHALLENGE,
  EVENT_DISCRIMINATOR,
  EVENT_TYPE
} = require('../consts')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const CollectiveChallengeSchema = new Schema({
  spoons: {
    type: Number,
    required: [true, 'Le nombre de cuillères est obligatoire'],
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'team',
  }],
  pips: [{
    type: Schema.Types.ObjectId,
    ref: 'pip',
  }],
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
  },
  association: [{
    type: Schema.Types.ObjectId,
    ref: 'association',
  }],
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

CollectiveChallengeSchema.virtual('type').get(function() {
  return EVENT_COLL_CHALLENGE
})

module.exports = CollectiveChallengeSchema
