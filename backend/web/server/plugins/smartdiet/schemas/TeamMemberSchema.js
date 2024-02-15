const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')
const { DUMMY_REF } = require('../../../utils/database')

const Schema = mongoose.Schema

const TeamMemberSchema = new Schema({
  team: {
    type: Schema.Types.ObjectId,
    ref: 'team',
    required: [true, "L'équipe est obligatoire"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Le membre est obligatoire'],
  },
}, schemaOptions)

TeamMemberSchema.virtual('spoons', DUMMY_REF).get(function(){
  return 0
})

TeamMemberSchema.virtual('pips', {
  ref: 'challengeUserPip',
  localField: '_id',
  foreignField: 'user'
})

module.exports = TeamMemberSchema
