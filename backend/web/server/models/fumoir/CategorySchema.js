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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: false,
  },
}, schemaOptions)

CategorySchema.virtual('children', {
  ref: 'category', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'parent', // is equal to foreignField
  autopopulate: true,
})

CategorySchema.virtual('products', {
  ref: 'product', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'category', // is equal to foreignField
})

CategorySchema.methods.getDepth = function() {
  return this.parent? 1+this.parent.getDepth():0
}

CategorySchema.plugin(require('mongoose-autopopulate'))

module.exports=CategorySchema
