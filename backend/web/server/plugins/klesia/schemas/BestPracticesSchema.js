const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const OrderedArticlesSchema=require('./OrderedArticlesSchema')

// Best practices are exactly ordered articles

module.exports = OrderedArticlesSchema
