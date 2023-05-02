const { capitalize } = require('../../../../utils/text')
const mongoose = require("mongoose")
const lodash=require('lodash')
const { schemaOptions } = require('../../../utils/schemas')
const { QUOTATION_STATUS_ASKING } = require('../consts')

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
  end_date: {
    type: Date,
    required: false,
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
