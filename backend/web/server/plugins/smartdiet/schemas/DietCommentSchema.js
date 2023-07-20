const mongoose = require('mongoose')
const lodash=require('lodash')
const {schemaOptions} = require('../../../utils/schemas')
const CommentSchema = require('./CommentSchema')

const Schema = mongoose.Schema

const DietCommentSchema = new Schema(
  {
    ...CommentSchema,
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
DietCommentSchema.virtual('_defined_notes').get(function() {
  return lodash([this.punctuality_note,this.attentive_note,this.responsiveness_note,
    this.relevance_note,this.global_note])
    .filter(v => !lodash.isNil(v))
    .value()
})
/* eslint-disable prefer-arrow-callback */


module.exports = DietCommentSchema
