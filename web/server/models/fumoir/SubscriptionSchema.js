const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const moment = require('moment')
const {schemaOptions} = require('../../utils/schemas')

const Schema = mongoose.Schema

const SubscriptionSchema = new Schema({
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
}, schemaOptions)

SubscriptionSchema.virtual('is_active').get(function() {
  return moment(new Date()).isBetween(this.start, this.end)
})

SubscriptionSchema.plugin(mongooseLeanVirtuals)

module.exports = SubscriptionSchema
