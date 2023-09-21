const { CONTRACT_TYPE } = require('../consts')
const mongoose = require("mongoose")
const { schemaOptions } = require('../../../utils/schemas')

const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
  start_date: {
    type: Date,
    required: false,
  },
  end_date: {
    type: Date,
    required: false,
  },
  function: {
    type: String,
    required: [true, 'Le poste est obligatoire'],
  },
  company: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'Le description est obligatoire'],
  },
  contract_type: {
    type: String,
    enum: Object.keys(CONTRACT_TYPE),
  },
  city: {
    type: String,
  },
  picture: {
    type: String,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "jobUser",
    required: [true, `Le métier est obligatoire`],
  },
}, schemaOptions
);

module.exports = ExperienceSchema
