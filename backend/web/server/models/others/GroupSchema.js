const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { BUDGET_PERIOD, DASHBOARD_MODE } = require("../../utils/consts");

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company",
    required: true
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  allowed_services: [
    {
      service: {
        type: Schema.Types.ObjectId,
        ref: "service"
      },
      // Amount percent paid by the company
      supported_percent: {
        type: Number,
        min: 0,
        max: 1,
        required: true
      }
    }
  ],
  budget: {
    type: Number
  },
  budget_period: {
    type: String,
    enum: [null, ...Object.keys(BUDGET_PERIOD)]
  },
  type: {
    type: String,
    enum: Object.keys(DASHBOARD_MODE),
    required: true
  }
});

module.exports = GroupSchema;
