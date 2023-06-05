const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const TargetSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: [true, 'La catégorie est obligatoire'],
  },
  picture: {
    type: String,
    required: false,
  },
  dummy: {
    type: Number,
    default: 0,
    required: true,
  },
}, schemaOptions)

TargetSchema.virtual("contents", {
  ref: "content", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "targets" // is equal to foreignField
});

TargetSchema.virtual("groups", {
  ref: "group", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "targets" // is equal to foreignField
});


TargetSchema.virtual("users", {
  ref: "user", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "targets" // is equal to foreignField
});

module.exports = TargetSchema
