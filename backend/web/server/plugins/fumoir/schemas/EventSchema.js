const mongoose = require('mongoose')
const moment = require('moment')
const {schemaOptions} = require('../../../utils/schemas')
const {PLACES, TO_COME, CURRENT, FINISHED} = require('../consts')

const Schema = mongoose.Schema

const EventSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    picture: {
      type: String,
    },
    price: {
      type: Number,
    },
    start_date: {
      type: Date,
      required: false,
    },
    end_date: {
      type: Date,
      required: false,
    },
    invitations: [{
      type: Schema.Types.ObjectId,
      ref: 'invitation',
      required: true,
    }],
    place: {
      type: String,
      enum: [...Object.keys(PLACES)],
      required: false,
    },
    max_guests_per_member: {
      type: Number,
      get: v => 1,
      required: [true, "Le nombre d'invités maxmimum par membre obligatoire"],
    },
    max_people: {
      type: Number,
      required: [true, 'Le nombre de participants maximum est obligatoire'],
    }
  },
  schemaOptions,
)

// This booking's payments
EventSchema.virtual('payments', {
  ref: 'payment', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'event', // is equal to foreignField
})

/**
 TODO: should rather be a virtual function insteadd of this trick
 BUT: if it's a function, mongoose asks got foreignField declaration during populate
 THEN: exclude fields are marked as computed in buildPopulate(s)
 */
EventSchema.virtual('guests', {
  ref: 'guest', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: '_id', // is equal to foreignField
})

// Computed field
EventSchema.virtual('guests_count').get(() => {
  return null
})

EventSchema.virtual('members_count').get(function() {
  return this.guests_count + this.invitations?.length || 0
})

EventSchema.virtual('people_count').get(function() {
  if (!this.invitations) {
    return 0
  }
  const members_count=this.invitations.length
  const guests_count=this.invitations.filter(m => !!m.guest).length
  return members_count+guests_count
})

EventSchema.virtual('registration_status').get(function() {
  return null
})

EventSchema.virtual('status').get(function() {
  if (this.start_date && moment() < moment(this.start_date)) {
    return TO_COME
  }
  if (this.end_date && moment() > moment(this.end_date)) {
    return FINISHED
  }
  // Not before, not after => current if both dates defined
  if (this.start_date && this.end_date) {
    return CURRENT
  }
  return null
})

module.exports = EventSchema
