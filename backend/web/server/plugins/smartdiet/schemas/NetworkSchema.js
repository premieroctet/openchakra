const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const NetworkSchema = new Schema({
  name: {
    type: String,
    set: v => v?.trim(),
    required: [true, 'Le nom est obligatoire'],
  },
  migration_id: {
    type: Number,
    required: false,
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
/* eslint-enable prefer-arrow-callback */


module.exports = NetworkSchema
