const mongoose = require('mongoose')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const noteType={
  type: Number,
  max: 5,
  min: 0,
  //required: true,
}

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  cigar: {
    type: Schema.Types.ObjectId,
    ref: 'cigar',
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  general_comment: String,
  general_aspect_note: noteType,
  aroma_spicy: Boolean,
  aroma_woody: Boolean,
  aroma_empyreumatic: Boolean,
  aroma_animal: Boolean,
  aroma_vegetal: Boolean,
  aroma_earthy: Boolean,
  aroma_mineral: Boolean,
  aroma_forest: Boolean,
  taste_note: noteType,
  taste_comment: String,
  // Before start notation
  before_ignition_note: noteType,
  before_ignition_comment: String,
  // Start smoking
  smoking_start_spicy: Boolean, // piquant
  smoking_start_stinging: Boolean, // cuisant
  smoking_start_rough: Boolean, // râppeux
  smoking_start_pungent: Boolean, // âcre
  smoking_start_note: noteType,
  smoking_start_comment: String,
  // During smoke
  during_smoke_sweety: Boolean,
  during_smoke_acid: Boolean,
  during_smoke_bitter: Boolean,
  during_start_note: noteType,
  during_start_comment: String,
  // Flavour
  flavor_note: noteType,
  // Balancing
  balancing_good: Boolean,
  balancing_bump: Boolean,
  balancing_changing: Boolean,
  // Persistence
  persistence_long: Boolean,
  persistence_mean: Boolean,
  persistence_short: Boolean,
  // Feeling
  feeling_fullness: Boolean,
  feeling_heaviness: Boolean,
  feeling_flatness: Boolean,
  feeling_lightness: Boolean,

}, schemaOptions)

ReviewSchema.plugin(mongooseLeanVirtuals)

module.exports = ReviewSchema
