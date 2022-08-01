const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
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

JobSchema.plugin(mongooseLeanVirtuals)

module.exports = mongoose.model('job', JobSchema)
