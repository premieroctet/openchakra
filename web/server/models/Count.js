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


module.exports = Count = mongoose.model('count', CountSchema)
