const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CalendarSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  events: [
    {
      title: String,
      start: Date,
      end: Date,
      allDay: Boolean,
    },
  ],
})

module.exports = CalendarSchema
