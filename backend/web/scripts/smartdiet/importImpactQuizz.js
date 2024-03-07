const mongoose = require('mongoose')
const fs=require('fs')
const lodash=require('lodash')
const moment=require('moment')
const { getDatabaseUri } = require('../../config/config')
const { MONGOOSE_OPTIONS } = require('../../server/utils/database')
const { extractData } = require('../../utils/import')
const { XL_TYPE } = require('../../utils/consts')
const { runPromisesWithDelay } = require('../../server/utils/concurrency')
const { QUIZZ_TYPE_IMPACT, QUIZZ_QUESTION_TYPE_NUMERIC, QUIZZ_QUESTION_TYPE_ENUM_SINGLE, QUIZZ_QUESTION_TYPE_ENUM_MULTIPLE, QUIZZ_QUESTION_TYPE_TEXT } = require('../../server/plugins/smartdiet/consts')
const Quizz = require('../../server/models/Quizz')
const QuizzQuestion = require('../../server/models/QuizzQuestion')
const Item = require('../../server/models/Item')
require('../../server/plugins/smartdiet/functions')

const CATEGORY_MARKER='Catégorie'
const TAB_NAME='Questionnaire final post coachi'

const QUIZZ_NAME='Quizz impact'

const NUMBER_TYPE='Number'
const SINGLE_TYPE='Single'
const MULTIPLE_TYPE='Multiple'
const TEXT_TYPE='Text'

const MONGOOSE_TYPES={
  [NUMBER_TYPE]: QUIZZ_QUESTION_TYPE_NUMERIC,
  [SINGLE_TYPE]: QUIZZ_QUESTION_TYPE_ENUM_SINGLE,
  [MULTIPLE_TYPE]: QUIZZ_QUESTION_TYPE_ENUM_MULTIPLE,
  [TEXT_TYPE]: QUIZZ_QUESTION_TYPE_TEXT,
}

const importQuizz = async filePath => {
  const contents=fs.readFileSync(filePath)
  const data=await extractData(contents, {format: XL_TYPE, tab: TAB_NAME, columns: false})
  let category=null
  let impactQuizz=await Quizz.findOne({type: QUIZZ_TYPE_IMPACT})
      .populate({path: 'questions', populate: 'available_answers'})
  if (!impactQuizz) {
    console.log('Creating missing impact quizz')
    impactQuizz=await Quizz.create({name: QUIZZ_NAME, type: QUIZZ_TYPE_IMPACT})
  }
  return runPromisesWithDelay(data.records.map(record => async () => {
    const [title, type, answers]=record
    if (type==CATEGORY_MARKER) {
      category=title
    }
    else if (!lodash.isEmpty(type)) {
      if (![NUMBER_TYPE, SINGLE_TYPE, MULTIPLE_TYPE, TEXT_TYPE].includes(type)) {
        throw new Error(`Unknwon type ${type}`)
      }
      console.log(category, title, type, answers)
      let items=[]
      if (type==SINGLE_TYPE || type==MULTIPLE_TYPE) {
        if (lodash.isEmpty(answers)) {
          throw new Eror('Missing answers for question', title)
        }
        items=answers.split('/').map(v => v.trim()).filter(v => !!v)
      }
      let question=impactQuizz.questions.find(q => q.title==title)?._id
      if (!question) {
        question=(await QuizzQuestion.create({type: MONGOOSE_TYPES[type], title, category}))._id
        await Quizz.findByIdAndUpdate(impactQuizz._id, {$push: {questions: question}})
      }
      return Promise.all(items.map(item => {
        if (!question.available_answers?.some(a => a.text==item)) {
          console.log('Création item', item)
          return Item.create({text: item, quizzQuestion: question})
        }
      }))
    }
  }))
  .then(res => {
    const rej=res.find(r => r.status=='rejected')
    if (rej) {
      throw new Error(rej.reason)
    }
    return Quizz.findOne({type: QUIZZ_TYPE_IMPACT}).populate({path: 'questions', populate: 'available_answers'})
  })
  .then(quizz => {
    console.group(quizz.name)
    quizz.questions.forEach(question => {
      console.group(question.title)
      question.available_answers.forEach(answer => {
        console.log(answer.text)
      })
      console.groupEnd()
    })
  })
}

const xl_file=process.argv[2]
if (!xl_file) {
  console.error(`Expected XL impact quizz file to import`)
  process.exit(1)
}

console.log(`Importing quizz ${xl_file}`)
return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => importQuizz(xl_file))
  //.then(console.log)
  .catch(console.error)
  .finally(() => process.exit())
