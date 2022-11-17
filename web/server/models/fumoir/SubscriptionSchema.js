const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const {REVIEW_STATUS} = require('../../../utils/consts')


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
})

SubscriptionSchema.plugin(mongooseLeanVirtuals)

module.exports = SubscriptionSchema
