const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongooseLeanVirtuals = require('mongoose-lean-virtuals')

const NewsletterSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
})

NewsletterSchema.plugin(mongooseLeanVirtuals)

module.exports = NewsletterSchema
