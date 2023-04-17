const mongoose = require("mongoose")
const { schemaOptions } = require('../../../utils/schemas')

const Schema = mongoose.Schema;

const DiplomaSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom du diplôme est obligatoire'],
  },
  start_date: {
    type: Date,
    required: false,
  },
  end_date: {
    type: Date,
    required: false,
  },
  school: {
    type: String,
    required: false,
  },
  city: {
    type: String,
  },
  description: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "jobUser",
    required: true,
  },
}, schemaOptions
);

module.exports = DiplomaSchema
