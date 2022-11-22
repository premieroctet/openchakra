const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')
const {PLACES}=require('../../../utils/fumoir/consts')

const Schema = mongoose.Schema

const BookingSchema = new Schema({
  table_number: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  booking_user: { // User who booked
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  guests: [{ // Guest email addresses
    type: String,
  }],
  place: {
    type: String,
    enum: [...Object.keys(PLACES)],
    required: true,
  },
  
}, schemaOptions)

ProductSchema.virtual('booking_total_person').get(function() {
  return this.members?.length + this.guests?.length
})


module.exports = BookingSchema
