const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')
const Schema = mongoose.Schema

const CategoryProductSchema = new Schema({
  name: {
    type: String,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
}, schemaOptions)

module.exports=CategoryProductSchema
