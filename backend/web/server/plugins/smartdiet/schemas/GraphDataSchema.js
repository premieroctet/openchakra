const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const GraphDataSchema = new Schema({
  x: {
    type: String,
    required: [true, 'X est obligatoire']
  },
  y: {
    type: String,
    required: [true, 'Y est obligatoire']
  },
}, schemaOptions)

module.exports = GraphDataSchema
