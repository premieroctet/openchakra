const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongooseLeanVirtuals = require('mongoose-lean-virtuals')

const Commission = new Schema({
  rate: {
    type: Number,
    required: true,
    min: v => v>0,
    max: 100,
  },
  // Destinee company
  destinee: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: true,
  },
})

const CustomizationSchema = new Schema({
  provider_fee: {
    type: Commission,
    required: false,
  },
  customer_fee: {
    type: Commission,
    required: false,
  },
})

CustomizationSchema.plugin(mongooseLeanVirtuals)

module.exports = Customization = mongoose.model('customization', CustomizationSchema)
