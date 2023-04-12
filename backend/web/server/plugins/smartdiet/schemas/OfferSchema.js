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
  webinars_credit: {
    type: Number,
    required: [true, 'Le crédit de webinars est obligatoire'],
  },
  webinars_unlimited: {
    type: Boolean,
    required: true,
  },
  infographies_credit: {
    type: Number,
    required: [true, "Le crédit d'infographies est obligatoire"],
  },
  inforgraphies_unlimited: {
    type: Boolean,
    required: true,
  },
  articles_credit: {
    type: Number,
    required: [true, 'Le crédit d\'articles est obligatoire'],
  },
  articles_unlimited: {
    type: Boolean,
    required: true,
  },
  podcasts_credit: {
    type: Number,
    required: [true, 'Le crédit de podcats est obligatoire'],
  },
  podcasts_unlimited: {
    type: Boolean,
    required: true,
  },
  video_credit: {
    type: Number,
    required: [true, 'Le crédit de vidéos est obligatoire'],
  },
  video_unlimited: {
    type: Boolean,
    required: true,
  },
  collective_challenge_available: {
    type: Boolean,
  },
  individual_challenge_available: {
    type: Boolean,
  },
  online_coaching_available: {
    type: Boolean,
  },
  coaching_credit: {
    type: Number,
    required: [true, 'Le crédit de coachings est obligatoire'],
  },
}, schemaOptions)

OfferSchema.virtual("company", {
  ref: "company", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "offer", // is equal to foreignField
  justOne: true,
});

module.exports = OfferSchema
