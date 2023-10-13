const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const TipSchema = new Schema({
  body: {
    type: String,
    required: [true, 'Le contenu est obligatoire'],
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
/* eslint-enable prefer-arrow-callback */

module.exports = TipSchema
