const mongoose = require('mongoose')
const {ROLE_DISCRIMINATOR} = require('../consts')
const lodash=require('lodash')
const {schemaOptions} = require('../../../utils/schemas')
const UserSchema = require('./UserSchema')

const Schema = mongoose.Schema

const DietSchema = UserSchema

module.exports = DietSchema
