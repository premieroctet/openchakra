const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongooseLeanVirtuals = require('mongoose-lean-virtuals')

const FilterPresentationSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
})

FilterPresentationSchema.plugin(mongooseLeanVirtuals)

module.exports = FilterPresentationSchema
