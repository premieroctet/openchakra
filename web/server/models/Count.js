const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

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

CountSchema.post('save', function (done) {
  if (this.isNew) {
    this.isNew.value += 1
    next()
  }
})
CountSchema.findOneAndUpdate({

  // [{
  //   $addFields: {
  //     counter: {
  //       $cond: [{
  //         $seq: ["$date", 'end_date']
  //       }, {
  //         $add: ["counter", 1]
  //       }, 0]
  //     }
  //   }
  // }]

}).then(counter => {
  if (counter.date.getMonth ===
    // Date now ou end_date(Booking) ou $month (variable mongo)
    date.now().getMonth()) {
    counter.counter += 1;
  } else {
    counter.counter = 0;
  }
  counter.save()
    .then(updateCounter => {

    })
})

// let count = connection.model('count', CountSchema);
// count.nextCount(function (err, count) {
//   const _count = new Count();
//   count.save(function (err) {
//     try {
//       _count.resetCount(function (err, count) {
//         count.value = 0;
//       })
//     } catch (err) {
//       console.error(err);
//     }
//   })
// })
module.exports = Booking = mongoose.model('count', CountSchema);