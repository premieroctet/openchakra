// Expects JSON
const {
  QUIZZ_QUESTION_TYPE_ENUM_MULTIPLE,
  QUIZZ_QUESTION_TYPE_ENUM_SINGLE,
  QUIZZ_QUESTION_TYPE_NUMERIC,
  QUIZZ_QUESTION_TYPE_TEXT,
  QUIZZ_TYPE_HEALTH,
  QUIZZ_TYPE_PATIENT
} = require('../../server/plugins/smartdiet/consts')
const { extractData, guessFileType } = require('../../utils/import')
const { guessDelimiter } = require('../../utils/text')

const { MONGOOSE_OPTIONS } = require('../../server/utils/database')
const { getDatabaseUri } = require('../../config/config')
const mongoose = require('mongoose')
const lodash=require('lodash')
const moment=require('moment')
const fs=require('fs')
const Item = require('../../server/models/Item')
const QuizzQuestion = require('../../server/models/QuizzQuestion')
const Quizz = require('../../server/models/Quizz')

const TYPE_MAPPING={
  Single: QUIZZ_QUESTION_TYPE_ENUM_SINGLE,
  Multiple: QUIZZ_QUESTION_TYPE_ENUM_MULTIPLE,
  Number: QUIZZ_QUESTION_TYPE_NUMERIC,
  Text: QUIZZ_QUESTION_TYPE_TEXT,
}

const QUIZZ_NAME='Bilan nutritionnel initial'

const importQuizz= (data) => {
  console.log(data.headers)
  return Promise.all(data.records.map(question => {
    const type=TYPE_MAPPING[question.type]
    const title=question.title
    const answers=question.answers.split('/').map(answer => answer.trim())
    if (!type) throw new Error(`Unkown type ${question.type} for ${question.title}`)
    if ([QUIZZ_QUESTION_TYPE_ENUM_SINGLE, QUIZZ_QUESTION_TYPE_ENUM_MULTIPLE].includes(type) && lodash.isEmpty(answers)) {
      throw new Error(`No anwers for ${question.title} ${question.type}`)
    }
    return QuizzQuestion.findOneAndUpdate({title}, {type, title}, {upsert: true, runValidators: true})
      .then(question => {
        if (answers.length>0) {
          return Promise.all(answers.map(answer => Item.findOneAndUpdate(
            {text: answer, quizzQuestion: question._id},
            {text: answer, quizzQuestion: question._id},
            {upsert: true}
          )))
          .then(() => question)
        }
        return question
      })
  }))
  .then(questions => Quizz.findOneAndUpdate(
    {name: QUIZZ_NAME},
    {name: QUIZZ_NAME, questions, type: QUIZZ_TYPE_HEALTH},
    {upsert: true, runValidators: true}
  ))
}

if (require.main === module) {
  const quizzFile=process.argv[2]
  if (!quizzFile) {
    console.log(`Expected quizz_filename`)
    process.exit(1)
  }
  const quizzs=fs.readFileSync(quizzFile)
  guessFileType(quizzs)
    .then(type => extractData(quizzs, {format: type, delimiter: ';'}))
    .then(data => {
      mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
        .then(()=> importQuizz(data))
        .then(console.log)
        .catch(console.error)
        .finally(() => process.exit(0))
    })
}
else {
  module.exports={
    importQuizz
  }
}
