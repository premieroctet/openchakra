const mongoose = require('mongoose')
const { schemaOptions } = require('../../../utils/schemas')

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  picture: {
    type: String,
    required: true,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "jobUser",
    required: true,
  },
}, schemaOptions
);

module.exports = PhotoSchema
