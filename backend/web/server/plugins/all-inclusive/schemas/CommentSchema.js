const mongoose = require("mongoose")
const bcrypt=require('bcryptjs')
const { schemaOptions } = require('../../../utils/schemas')
const { AVAILABILITY, COACHING, EXPERIENCE, ROLES } = require('../consts')
const IBANValidator = require('iban-validator-js')

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: [true, 'Le commentaire est obligatoire'],
  },
  note: {
    type: Number,
    required: [true, 'La note est obligatoire'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, 'Le créateur est obligatoire'],
  },
  mission: {
    type: Schema.Types.ObjectId,
    ref: "mission",
    required: [true, 'La mission est obligatoire'],
  },
}, schemaOptions
);

module.exports = CommentSchema
