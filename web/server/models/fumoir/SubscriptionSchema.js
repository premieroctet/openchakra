const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
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

SubscriptionSchema.plugin(mongooseLeanVirtuals)

module.exports = SubscriptionSchema
