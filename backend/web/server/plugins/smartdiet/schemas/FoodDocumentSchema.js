const { FOOD_DOCUMENT_TYPE } = require('../consts')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const FoodDocumentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  manual_url: {
    type: String,
    required: false,
  },
  document: {
    type: String,
    required: false,
  },
  key: {
    type: Schema.Types.ObjectId,
    ref: 'key',
    required: [true, 'La clé est obligatoire'],
  },
  type: {
    type: String,
    enum: Object.keys(FOOD_DOCUMENT_TYPE),
    required: [true, 'Le type est obligatoire'],
  }
}, schemaOptions)

FoodDocumentSchema.virtual('url').get(function() {
  return this.document || this.manual_url
})

module.exports = FoodDocumentSchema
