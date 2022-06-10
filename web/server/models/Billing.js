const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongooseLeanVirtuals = require('mongoose-lean-virtuals')

const BillingSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
})

BillingSchema.plugin(mongooseLeanVirtuals)

module.exports = mongoose.model('billing', BillingSchema)
