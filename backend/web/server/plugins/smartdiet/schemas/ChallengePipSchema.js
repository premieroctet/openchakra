const mongoose = require('mongoose')
const lodash=require('lodash')
const {schemaOptions} = require('../../../utils/schemas')
const { DUMMY_REF } = require('../../../utils/database')

const Schema = mongoose.Schema

const ChallengePipSchema = new Schema({
  collectiveChallenge: {
    type: Schema.Types.ObjectId,
    ref: 'collectiveChallenge',
    required: [true, 'Le challenge est obligatoire'],
  },
  pip: {
    type: Schema.Types.ObjectId,
    ref: 'pip',
    required: [true, 'Le pépin est obligatoire'],
  },
}, schemaOptions)

ChallengePipSchema.virtual('userPips', {
  ref: 'challengeUserPip',
  localField: '_id',
  foreignField: 'pip',
})

ChallengePipSchema.virtual('spoons', DUMMY_REF).get(function() {
  return lodash(this.userPips || []).sumBy(up => up.valid)*this.pip.spoons
})

// Pips to validate by diet
ChallengePipSchema.virtual('pendingUserPips', DUMMY_REF).get(function() {
  return lodash(this.userPips || []).filter(up => !!up.proof && !up.valid)
})

module.exports = ChallengePipSchema
