const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')
const {PLACES}=require('../../../utils/fumoir/consts')

const Schema = mongoose.Schema

const EventSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
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


module.exports = EventSchema
