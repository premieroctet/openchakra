const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {SPOON_SOURCE} = require('../consts')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Le texte de la réponse est obligatoire'],
  },
  // If item belongs to quizz question's available answers
  quizzQuestion: {
    type: Schema.Types.ObjectId,
    ref: 'quizzQuestion',
    required: false,
  },
  // If item belongs to user quizz question's multiple answers
  userQuizzQuestion: {
    type: Schema.Types.ObjectId,
    ref: 'userQuizzQuestion',
    required: false,
  },
}, schemaOptions)

module.exports = ItemSchema
