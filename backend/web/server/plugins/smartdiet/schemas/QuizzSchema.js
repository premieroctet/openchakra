const {
  CREATED_AT_ATTRIBUTE,
  UPDATED_AT_ATTRIBUTE
} = require('../../../../utils/consts')
const { QUIZZ_TYPE } = require('../consts')
const mongoose = require('mongoose')
const lodash = require('lodash')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const QuizzSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  type: {
    type: String,
    enum: Object.keys(QUIZZ_TYPE),
    required: [true, 'Le type est obligatoire'],
  },
  key: {
    type: Schema.Types.ObjectId,
    ref: 'key',
    required: false,
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'quizzQuestion',
    required: true,
  }],
  // Default food logbook
  default: {
    type: Boolean,
    default: false,
  }
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
QuizzSchema.methods.cloneAsUserQuizz=function() {
  return Promise.all(this.questions.map(q => q.cloneAsUserQuestion()))
    .then(questions => {
      const params={
        ...lodash.omit(this.toObject(), ['_id', 'id', CREATED_AT_ATTRIBUTE, UPDATED_AT_ATTRIBUTE]),
        quizz: this._id,
        questions,
      }
      return mongoose.models.userQuizz.create(params)
        .then(q => {console.log(`Created quizz ${q}`); return q})
    })
}
/* eslint-enable prefer-arrow-callback */


module.exports = QuizzSchema
