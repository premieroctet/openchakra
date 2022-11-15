const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const {REVIEW_STATUS} = require('../../../utils/consts')


const ReviewSchema = new Schema({
  content: {
    type: String,
  },
  note: {
    type: Number,
    max: 5,
    min: 0,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  status: {
    type: String,
    enum: Object.values(REVIEW_STATUS),
    default: REVIEW_STATUS.NOT_MODERATED,
    required: true,
  },
})

ReviewSchema.plugin(mongooseLeanVirtuals)

module.exports = ReviewSchema
