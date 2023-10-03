const { getDatabaseUri } = require('../../config/config')
const { MONGOOSE_OPTIONS } = require('../../server/utils/database')
const { getDataModel } = require('../../config/config')
const mongoose = require('mongoose')
const lodash=require('lodash')
const moment=require('moment')
const CoachingLogbook = require('../../server/models/CoachingLogbook')
require('../../server/models/UserQuizz')
const util=require('util')

/****** Have to remove:
user_id from Content: viewed_by, likdes, pins, shares
Coaching whose user is user_id / appointments linked to this coaching
Content: remove from [] viewed_by, likes, pins, shares
Comments: referenced by user
Messages: sender or receiver. Remove in likes / pins
*/
const cleanLogbooks = () => {
  return CoachingLogbook.find()
    .populate('logbook')
    .sort({coaching: 1, day:1})
    .then(logbooks => {
      let grouped=lodash.groupBy(logbooks, lb => `${lb.coaching}/${moment(lb.day).valueOf()}/${lb.logbook.quizz}`)
      grouped=lodash.pickBy(grouped, val => val.length>1)
      return Promise.all(Object.values(grouped).map(coachingLogbooks => {
        console.log(coachingLogbooks.length)
        return CoachingLogbook.findByIdAndRemove(lodash.last(coachingLogbooks)._id)
      }))
    })
}

if (!getDataModel()=='smartdiet') {
  console.errro(`Run as smartdiet datamodel`)
}
return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => cleanLogbooks())
  .then(res => console.log(util.inspect(res, null, 2)))
  .catch(console.error)
  .finally(() => process.exit())
