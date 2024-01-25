const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const { SURVEY_ANSWER } = require('../consts')

const Schema = mongoose.Schema

const UserSurveySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  migration_id: {
    type: Number
  }
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
UserSurveySchema.virtual('questions', {
  ref: 'userQuestion', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'survey', // is equal to foreignField
})
/* eslint-enable prefer-arrow-callback */


module.exports = UserSurveySchema
