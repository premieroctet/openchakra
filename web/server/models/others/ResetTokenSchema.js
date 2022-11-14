const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongooseLeanVirtuals = require('mongoose-lean-virtuals')

const ResetTokenSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    expires: 36000,
  },
  token: String,
})

ResetTokenSchema.plugin(mongooseLeanVirtuals)

module.exports = ResetTokenSchema
