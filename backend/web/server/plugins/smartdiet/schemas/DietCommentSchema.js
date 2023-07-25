const mongoose = require('mongoose')
const lodash=require('lodash')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const DietCommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, "L'utilisateur est obligatoire"],
    },
    text: {
      type: String,
      required: [true, 'Le commentaire est obligatoire'],
    },
    diet: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, "La diet est obligatoire"],
    },
    // Ponctualité
    punctuality_note: {
      type: Number,
      required: false,
    },
    // À l'écoute
    attentive_note: {
      type: Number,
      required: false,
    },
    // Réactivité
    responsiveness_note: {
      type: Number,
      required: false,
    },
    // Pertinence
    relevance_note: {
      type: Number,
      required: false,
    },
    // Global
    global_note: {
      type: Number,
      required: false,
    },
  },
  schemaOptions,
)

/* eslint-enable prefer-arrow-callback */
// Returns an array of non null notes
DietCommentSchema.virtual('_defined_notes', {localField:'tagada', foreignField:'tagada'}).get(function() {
  return lodash([this.punctuality_note,this.attentive_note,this.responsiveness_note,
    this.relevance_note,this.global_note])
    .filter(v => !lodash.isNil(v))
    .value()
})
/* eslint-disable prefer-arrow-callback */


module.exports = DietCommentSchema
