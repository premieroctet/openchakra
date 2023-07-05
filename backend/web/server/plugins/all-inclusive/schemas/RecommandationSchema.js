const mongoose = require("mongoose")
const bcrypt=require('bcryptjs')
const { schemaOptions } = require('../../../utils/schemas')
const { AVAILABILITY, COACHING, EXPERIENCE, ROLES } = require('../consts')
const IBANValidator = require('iban-validator-js')

const Schema = mongoose.Schema;

const RecommandationSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
  },
  note: {
    type: Number,
    required: [true, 'La note est obligatoire'],
  },
  comment: {
    type: String,
    required: [true, 'Le commentaire est obligatoire'],
  },
  firstname: {
    type: String,
    required: [true, 'Le prénom est obligatoire']
  },
  lastname: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "jobUser",
    required: [true, 'Le métier du TI est obligatoire'],
  },
  dummy: {
    type: Number,
    default: 0,
    required: true,
  },
}, schemaOptions
);

module.exports = RecommandationSchema;
