const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

const CountSchema = new Schema({
  numero
});
CountSchema.pre('save', function (done) {
  if (this.isNew) {
    getNewId(function (autoincremented_id) {
      this.id = autoincremented_id;
      done()
    })
  } else {
    done()
  }
})
let count = connection.model('count', CountSchema);
count.nextCount(function (err, count) {
  const _count = new Count();
  count.save(function (err) {
    _count.resetCount(function (err, count) {

    })
  })
})
module.exports = Booking = mongoose.model('count', CountSchema);