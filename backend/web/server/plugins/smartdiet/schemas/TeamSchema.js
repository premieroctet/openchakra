const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const { HOME_STATUS, CONTENTS_TYPE } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

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

TeamSchema.virtual('members', {
    ref: 'teamMember',
    localField: '_id',
    foreignField: 'team',
})

module.exports = TeamSchema
