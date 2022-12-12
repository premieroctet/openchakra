const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const Schema = mongoose.Schema;
const { schemaOptions } = require("../../utils/schemas");

const OrderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true
    },
    quantity: {
      type: Number,
      get: v => Math.round(v),
      set: v => Math.round(v),
      min: 1,
      required: true
    },
    price: {
      // Price including tax
      type: Number,
      min: 0
    },
    vat_rate: {
      // VAT rate (0.0 => 1.0)
      type: Number,
      min: 0,
      max: 1
    }
  },
  schemaOptions
);

OrderItemSchema.virtual("net_price").get(function() {
  return this.price * (1 - this.vat_rate);
});

OrderItemSchema.plugin(mongooseLeanVirtuals);

module.exports = OrderItemSchema;
