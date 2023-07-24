const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const { SURVEY_ANSWER } = require('../consts')

const Schema = mongoose.Schema

const UserQuizzSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  quizz: {
    type: Schema.Types.ObjectId,
    ref: 'quizz',
    required: true,
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
UserQuizzSchema.virtual('answers', {
  ref: 'quizzAnswer', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'quizz', // is equal to foreignField
})
/* eslint-enable prefer-arrow-callback */


module.exports = UserQuizzSchema
