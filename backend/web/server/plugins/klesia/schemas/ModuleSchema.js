const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const ModuleSchema = new Schema({
  contents:[{
    type: Schema.Types.ObjectID,
    ref: 'content',
    required: true,
  }],
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
/* eslint-enable prefer-arrow-callback */

module.exports = ModuleSchema
