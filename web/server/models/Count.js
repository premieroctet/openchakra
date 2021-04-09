const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountSchema = new Schema({
  key: {
    type: String
  },
  value: {
    type: String
  },
  type: {
    type: String
  }
});


module.exports = Booking = mongoose.model('count', CountSchema);
