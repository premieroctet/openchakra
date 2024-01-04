const { MONGOOSE_OPTIONS } = require('../../server/utils/database')
const { getDataModel, getDatabaseUri } = require('../../config/config')
const mongoose = require('mongoose')
const lodash=require('lodash')
const moment=require('moment')
const Quizz=require('../../server/models/Quizz')
require('../../server/models/QuizzQuestion')
const { QUIZZ_TYPE_HEALTH } = require('../../server/plugins/smartdiet/consts')

const checkBilan = () => {
  return Quizz.findOne({type: QUIZZ_TYPE_HEALTH})
    .populate('questions')
    .then(quizz => console.log(quizz.questions.map(q => q.title)))
}

console.log(`Checking biulan`)
return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(checkBilan)
  .then(console.log)
  .catch(console.error)
  .finally(() => process.exit())
