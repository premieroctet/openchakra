const mongoose = require('mongoose')
const {schemaOptions} = require('../../utils/schemas')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
}, schemaOptions)

module.exports=CategorySchema
