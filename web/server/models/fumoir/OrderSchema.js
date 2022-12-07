const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const Schema = mongoose.Schema
const {schemaOptions} = require('../../utils/schemas')

const OrderSchema = new Schema({
  billing_number: {
    type: String,
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'orderItem',
  }],
  payment: {
    id: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'booking',
  },
  // member or guest have to be fulfilled
  member: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  guest: {
    type: String,
  },
}, schemaOptions)


OrderSchema.plugin(mongooseLeanVirtuals)

module.exports = OrderSchema
