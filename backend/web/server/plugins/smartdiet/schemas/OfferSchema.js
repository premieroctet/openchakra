const { GROUPS_CREDIT, HOME_STATUS } = require('../consts')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
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
    required: [function() {return !this.webinars_unlimited}, 'Le crédit de webinars est obligatoire'],
  },
  webinars_unlimited: {
    type: Boolean,
    default: false,
    required: true,
  },
  infographies_credit: {
    type: Number,
    required: [function() {return !this.infographies_unlimited}, "Le crédit d'infographies est obligatoire"],
  },
  infographies_unlimited: {
    type: Boolean,
    default: false,
    required: true,
  },
  articles_credit: {
    type: Number,
    required: [function() {return !this.articles_unlimited}, 'Le crédit d\'articles est obligatoire'],
  },
  articles_unlimited: {
    type: Boolean,
    default: false,
    required: true,
  },
  podcasts_credit: {
    type: Number,
    required: [function() {return !this.podcasts_unlimited}, 'Le crédit de podcats est obligatoire'],
  },
  podcasts_unlimited: {
    type: Boolean,
    default: false,
    required: true,
  },
  video_credit: {
    type: Number,
    required: [function() {return !this.video_unlimited}, 'Le crédit de vidéos est obligatoire'],
  },
  video_unlimited: {
    type: Boolean,
    default: false,
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
  hotdiet_available: {
    type: Boolean,
  },
  groups_credit: {
    type: String,
    enum: Object.keys(GROUPS_CREDIT),
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: false,
  },
}, schemaOptions)

module.exports = OfferSchema
