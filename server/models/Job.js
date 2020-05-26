const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {normalize} = require('../../utils/text')

const JobSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    s_label: {
      type: String,
      default: function() {
        return normalize(this.label)
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
