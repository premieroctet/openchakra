const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

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

TeamMemberSchema.virtual('spoons').get(function(){
  return 0
})

TeamMemberSchema.virtual('pips', {
  ref: 'challengeUserPip',
  localField: '_id',
  foreignField: 'user'
})

module.exports = TeamMemberSchema
