const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var metaphone = require('metaphone')

const JobSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    s_label: {
      type: String,
      default: function() {
        return metaphone(this.label)
      }
    },

});

const Job = mongoose.model('job',JobSchema);

// To update s_label
Job.find({})
  .then (jobs => {
    jobs.forEach( j => j.save());
  }
)


module.exports = Job;
