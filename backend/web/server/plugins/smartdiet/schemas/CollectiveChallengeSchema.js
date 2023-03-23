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
  type: {
    type: String,
    enum: Object.keys(EVENT_TYPE),
    default: EVENT_COLL_CHALLENGE,
    set: () => EVENT_COLL_CHALLENGE,
    required: [true, 'Le type est obligatoire'],
  },

  spoons: {
    type: Number,
    required: [true, 'Le nombre de cuillères est obligatoire'],
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'team',
  }],
  /**
  TODO New model ??
  ranking: {

  },
  */
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

module.exports = CollectiveChallengeSchema
