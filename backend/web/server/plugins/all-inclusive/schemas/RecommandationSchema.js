const mongoose = require("mongoose")
const bcrypt=require('bcryptjs')
const { schemaOptions } = require('../../../utils/schemas')
const { AVAILABILITY, COACHING, EXPERIENCE, ROLES } = require('../consts')
const IBANValidator = require('iban-validator-js')

const Schema = mongoose.Schema;

const RecommandationSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  lastname: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
}, schemaOptions
);

module.exports = RecommandationSchema;
