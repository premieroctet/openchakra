const { CONTENTS_TYPE, HOME_STATUS, TARGET_TYPE } = require('../consts')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  type: {
    type: String,
    enum: Object.keys(TARGET_TYPE),
    required: false,
  },
  picture: {
    type: String,
    required: [true, 'L\'illustration est obligatoire'],
  },
}, schemaOptions)

CategorySchema.virtual("targets", {
  ref: "target", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "category" // is equal to foreignField
});

module.exports = CategorySchema
