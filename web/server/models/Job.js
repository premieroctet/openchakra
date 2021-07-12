const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {normalize} = require('../../utils/text')

const JobSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  s_label: {
    type: String,
    default: function() {
      return normalize(this.label)
    },
    sparse: true,
  },
})

module.exports = JobSchema
