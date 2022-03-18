const mongoose = require('mongoose')
const {getDataModel}=require('../../config/config')

const ProductSchema=require(`./${getDataModel()}/ProductSchema`)

module.exports = mongoose.model('product', ProductSchema)
