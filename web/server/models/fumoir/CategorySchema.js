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
}, schemaOptions)

CategorySchema.add({parent: CategorySchema})

CategorySchema.statics.ancestor = function() {
  
  return this.aggregate([
    {
      $match: {
        parent: {
          $exists: true,
        },
      },
    },
    {
      $graphLookup: {
        from: 'categories',
        startWith: '$parent',
        connectFromField: 'parent',
        connectToField: '_id',
        maxDepth: 3,
        depthField: 'depth',
        as: 'ancestor',
      },
    }])
}

CategorySchema.statics.child = function() {
  
  return this.aggregate([
    {
      $graphLookup: {
        from: 'categories',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'parent',
        maxDepth: 3,
        depthField: 'depth',
        as: 'child',
      },
    }])

}

module.exports=CategorySchema
