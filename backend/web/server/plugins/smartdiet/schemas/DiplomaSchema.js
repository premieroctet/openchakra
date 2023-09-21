const mongoose = require("mongoose")
const { schemaOptions } = require('../../../utils/schemas')

const Schema = mongoose.Schema;

const DiplomaSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom du diplôme est obligatoire'],
  },
  date: {
    type: Date,
    required: false,
  },
  document: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, "L'utilisateur est obligatoire"],
  },
}, schemaOptions
);

module.exports = DiplomaSchema
