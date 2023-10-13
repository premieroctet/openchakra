const mongoose = require('mongoose')
const { schemaOptions } = require('../../../utils/schemas')

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  picture: {
    type: String,
    required: [true, `L'image est obligatoire`],
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "jobUser",
    required: [true, `Le métier est obligatoire`],
  },
}, schemaOptions
);

module.exports = PhotoSchema
