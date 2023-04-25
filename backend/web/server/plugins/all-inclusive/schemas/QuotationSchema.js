const {
} = require('../consts')
const mongoose = require("mongoose")
const bcrypt=require('bcryptjs')
const { schemaOptions } = require('../../../utils/schemas')
const IBANValidator = require('iban-validator-js')

const Schema = mongoose.Schema;

const QuotationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  mission: {
    type: Schema.Types.ObjectId,
    ref: "mission",
    required: false,
  },
}, schemaOptions
);

module.exports = QuotationSchema;
