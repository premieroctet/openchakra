const {COMMISSION_SOURCE} = require('../../utils/consts')
const mongoose = require('mongoose')

const Schema=mongoose.Schema

const CommissionSchema = new Schema({
  // Commission rate in %
  rate: {
    type: Number,
    required: true,
    set: v => parseInt(v),
    min: 0,
    max: 100,
  },
  // Commission fixed fee
  fixed: {
    type: Number,
    required: false,
    min: 0,
  },
  // Destinee company
  destinee: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: true,
  },
  // Taken from provider or customer ?
  source: {
    type: String,
    enum: Object.values(COMMISSION_SOURCE),
    required: true,
  },
})

module.exports = Commission = mongoose.model('commission', CommissionSchema)
