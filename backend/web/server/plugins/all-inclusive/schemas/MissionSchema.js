const { capitalize } = require('../../../../utils/text')
const mongoose = require("mongoose")
const lodash=require('lodash')
const { schemaOptions } = require('../../../utils/schemas')
const { QUOTATION_STATUS_ASKING, MISSION_FREQUENCY, MISSION_FREQUENCY_UNKNOWN } = require('../consts')

const Schema = mongoose.Schema;

const MissionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire']
  },
  start_date: {
    type: Date,
    required: false,
  },
  // Duration in nhours
  duration: {
    type: Number,
    required:false,
  },
  required_services: {
    type: String,
    required: false,
  },
  document: {
    type: String,
    required: false,
  },
  customer_location: {
    type: Boolean,
    default: false,
    required: true,
  },
  foreign_location: {
    type: Boolean,
    default: false,
    required: true,
  },
  frequency: {
    type: String,
    enum: Object.keys(MISSION_FREQUENCY),
    default: MISSION_FREQUENCY_UNKNOWN,
    required: [true, 'La fréquence de mission est obligatoire']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "jobUser",
    required: false,
  },
}, schemaOptions
);

MissionSchema.virtual("status").get(function() {
  if (lodash.isEmpty(this.quotations)) {
    return QUOTATION_STATUS_ASKING
  }
  const newest_quotation=lodash.maxBy(this.quotations, 'creation_date')
  return newest_quotation.status
})

MissionSchema.virtual("quotations", {
  ref: "quotation", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "mission" // is equal to foreignField
});

module.exports = MissionSchema;
