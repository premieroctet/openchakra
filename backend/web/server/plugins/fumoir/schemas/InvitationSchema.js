const mongoose = require('mongoose')
const moment = require('moment')
const {schemaOptions} = require('../../../utils/schemas')
const {PLACES, TO_COME, CURRENT, FINISHED} = require('../consts')

const Schema = mongoose.Schema

const InvitationSchema = new Schema(
  {
    member: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    guest: {
      type: Schema.Types.ObjectId,
      ref: 'guest',
      required: false,
    },
  },
  schemaOptions,
)

module.exports = InvitationSchema
