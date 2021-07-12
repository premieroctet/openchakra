const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CountSchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})


// module.exports = Booking = mongoose.model('count', CountSchema);
module.exports = CountSchema
