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
    required: [true, 'Le nom est obligatoire']
  },
  lastname: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, 'Le destinataire de la recommandation est obligatoire'],
  },
}, schemaOptions
);

module.exports = RecommandationSchema;
