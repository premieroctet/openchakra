const mongoose = require('mongoose')
const lodash=require('lodash')
const moment=require('moment')
const fs=require('fs')
// Expects JSON
const {
  QUIZZ_QUESTION_TYPE_ENUM_SINGLE,
  QUIZZ_TYPE_PATIENT
} = require('../../server/plugins/smartdiet/consts')
const Item = require('../../server/models/Item')
const QuizzQuestion = require('../../server/models/QuizzQuestion')
const Quizz = require('../../server/models/Quizz')

const upsertQuestion= q => {
  const params={
    title: q.question,
    type: QUIZZ_QUESTION_TYPE_ENUM_SINGLE,
    origin_id: q.id,
    origin_quizz_id: q.quiz_id,
    success_message: `Correct:${q.comments}`,
    error_message: `Faux:${q.comments}`,
  }
  return QuizzQuestion.update(
    {origin_id: q.id},
    params,
    {upsert: true, runValidators: true}
  )
  .then(() => QuizzQuestion.findOne({origin_id: q.id}))
  .then(created => {
    return Promise.all([q.firstanswer, q.secondanswer].map(answer => {
      return Item.create({text: answer, quizzQuestion: created._id})
    }))
    .then(([item1, item2]) => {
      const correct_answer=(q.firstanswergood ? item1 : item2)._id
      return QuizzQuestion.findOneAndUpdate({origin_id: q.id}, {correct_answer})
    })
  })
}

const importQuizz= ({quizzs , questions}) => {
  const createQuizzs=quizzs.map((quizz, index) => {
    const params={
      name: quizz.name,
      type: QUIZZ_TYPE_PATIENT,
      origin_id: quizz.id,
    }
    return Quizz.update(
      {origin_id: quizz.id},
      params,
      {upsert: true, runValidators: true}
    )
      .then(() => Quizz.findOne({origin_id: quizz.id}))
      .then(createdQuizz => {
        const quizzQuestions=lodash(questions)
          .filter(q => q.quiz_id==createdQuizz.origin_id)
          .sortBy('order')
          .value()
        return Promise.all(quizzQuestions.map(q => upsertQuestion(q)))
        .then(createdQuestions => {
          createdQuizz.questions=createdQuestions.map(q => q._id)
          return createdQuizz.save()
        })
      })
  })
  return Promise.all(createQuizzs)
    .then(() => Quizz.find({origin_id: {$ne: null}}))
    .then(quizzs => Promise.all(quizzs.map((q, idx) => {q.creation_date=moment().add(-idx, 'second'); return q.save()})))
}

if (require.main === module) {
  const [quizzFile, questionsFile]=process.argv.slice(2, 4)
  if (!(quizzFile && questionsFile)) {
    console.log(`Expected quizz_filename questions_filename`)
    process.exit(1)
  }
  const [quizzs, questions]=[quizzFile, questionsFile].map(filename => {
    return JSON.parse(fs.readFileSync(filename))
  })
  mongoose.connect('mongodb://localhost/smartdiet')
    .then(()=> importQuizz({quizzs, questions}))
    .then(console.log)
    .catch(console.error)
    .finally(() => process.exit(0))
}
else {
  module.exports={
    importQuizz
  }
}
