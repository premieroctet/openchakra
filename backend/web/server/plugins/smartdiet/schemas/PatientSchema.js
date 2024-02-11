const mongoose = require('mongoose')
const {ROLE_DISCRIMINATOR} = require('../consts')
const lodash=require('lodash')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const PatientSchema = new Schema(
  {},
  {...schemaOptions, ...ROLE_DISCRIMINATOR},
)

module.exports = PatientSchema
