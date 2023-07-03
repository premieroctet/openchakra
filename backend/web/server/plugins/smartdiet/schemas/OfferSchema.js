const { SystemError } = require('../../../utils/errors')
const {
  ARTICLE,
  CONTENTS_ARTICLE,
  CONTENTS_INFOGRAPHY,
  CONTENTS_PODCAST,
  CONTENTS_VIDEO,
  EVENT_COLL_CHALLENGE,
  EVENT_IND_CHALLENGE,
  EVENT_MENU,
  EVENT_WEBINAR,
  INFOGRAPHY,
  PODCAST,
  VIDEO
} = require('../consts')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')
const util=require('util')

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
    required: [function() {console.log(`Unlimited info:${util.inspect(this)}`); return !this.infographies_unlimited}, "Le crédit d'infographies est obligatoire"],
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
    required: [function() {return !this.podcasts_unlimited}, 'Le crédit de podcasts est obligatoire'],
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
    type: Number,
    required: [function() {return !this.groups_unlimited}, 'Le crédit de groupes est obligatoire'],
  },
  groups_unlimited: {
    type: Boolean,
    default: false,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: false,
  },
}, schemaOptions)

OfferSchema.methods.getContentLimit=function(type){
  const TYPE_2_ATTRIBUTE={
    [CONTENTS_ARTICLE]:'articles',
    [CONTENTS_INFOGRAPHY]:'infographies',
    [CONTENTS_VIDEO]:'video',
    [CONTENTS_PODCAST]:'podcasts',
  }
  const att=TYPE_2_ATTRIBUTE[type]
  const limit=this[`${att}_unlimited`]? Number.MAX_VALUE : this[`${att}_credit`]
  console.log(`Limit for ${type} is ${limit}`)
  return limit
}

OfferSchema.methods.getEventLimit=function(type){
  switch (type) {
    case EVENT_WEBINAR: return this.webinars_unlimited ? Number.MAX_VALUE : this.webinars_credit
    case EVENT_COLL_CHALLENGE: return this.collective_challenge_available ? Number.MAX_VALUE : 0
    case EVENT_IND_CHALLENGE: return this.individual_challenge_available ? Number.MAX_VALUE : 0
    case EVENT_MENU: return Number.MAX_VALUE
  }
  throw new SystemError(`Offer can't get event limit for type ${type}`)
}

module.exports = OfferSchema
