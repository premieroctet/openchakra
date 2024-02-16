const mongoose = require('mongoose')
const lodash=require('lodash')
const bcrypt=require('bcryptjs')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')
const { DUMMY_REF } = require('../../../utils/database')

const Schema = mongoose.Schema

const TeamSchema = new Schema({
  collectiveChallenge: {
    type: Schema.Types.ObjectId,
    ref: 'collectiveChallenge',
    required: [true, 'Le challenge est obligatoire'],
  },
  name: {
    type: String,
    set: v => v?.trim(),
    required: [true, 'Le nom est obligatoire'],
  },
  picture: {
    type: String,
    required: false,
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
TeamSchema.virtual('members', {
    ref: 'teamMember',
    localField: '_id',
    foreignField: 'team',
})

TeamSchema.virtual('spoons_count', DUMMY_REF).get(function() {
  return lodash(this.members).sumBy(m => m.pips.filter(p => p.valid).length)
})
/* eslint-enable prefer-arrow-callback */

module.exports = TeamSchema
