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
  picture: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, "L'utilisateur est obligatoire"],
  },
  migration_id: {
    type: Number,
    required: false,
  },
}, schemaOptions
);

module.exports = DiplomaSchema
