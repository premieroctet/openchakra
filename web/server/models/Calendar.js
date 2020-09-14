const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  events: [
    {
      title: String,
      start: Date,
      end: Date,
      allDay: Boolean,
    },
  ],


});

module.exports = Calendar = mongoose.model('calendar', CalendarSchema);
