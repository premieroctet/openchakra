const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  body: {
    type: String,
    required: [true, 'Le contenu est obligatoire'],
  },
  conclusion: {
    type: String,
    required: false,
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
/* eslint-enable prefer-arrow-callback */

module.exports = ArticleSchema
