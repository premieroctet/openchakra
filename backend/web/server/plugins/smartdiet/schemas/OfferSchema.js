const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const { HOME_STATUS } = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const OfferSchema = new Schema({
  name: {
    type: String,
    set: v => v?.trim(),
    required: [true, 'Le nom est obligatoire'],
  },
  price: {
    type: Number,
    required: [true, 'Le prix est obligatoire'],
  },
  duration: { // In days
    type: Number,
    min: [0, 'La durée ne peut être négative'],
    required: [true, 'La durée est obligatoire'],
  },
  webinars_count: {
    type: Number,
    required: [true, 'Le nombre de webinars autorisés est obligatoire'],
  },
  contents_count: {
    type: Number,
    required: [true, 'Le nombre de contenus autorisés est obligatoire'],
  },

}, schemaOptions)

OfferSchema.virtual("company", {
  ref: "company", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "offer", // is equal to foreignField
  justOne: true,
});

module.exports = OfferSchema
