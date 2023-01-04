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
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    //autopopulate: true,
    required: true,
  }],
}, schemaOptions)

CategorySchema.virtual('parent', {
  ref: 'category', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'children', // is equal to foreignField
  justOne: true,
})

CategorySchema.virtual('products', {
  ref: 'product', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'category', // is equal to foreignField
})

CategorySchema.methods.getDepth = function() {
  return this.parent? 1+this.parent.getDepth():0
}

//CategorySchema.plugin(require('mongoose-autopopulate'))

module.exports=CategorySchema
