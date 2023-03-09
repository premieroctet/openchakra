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

// Link to event)
InvitationSchema.virtual('event', {
  ref: 'event', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'invitations', // is equal to foreignField
  justOne: true,
})

// Computed field
InvitationSchema.virtual('paid_str').get(function() {
  return null
})

module.exports = InvitationSchema
