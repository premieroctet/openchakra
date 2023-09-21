const { ROLE_CUSTOMER } = require('../../server/plugins/smartdiet/consts')

const Diploma = require('../../server/models/Diploma')

const Group = require('../../server/models/Group')

const TeamMember = require('../../server/models/TeamMember')

const Content = require('../../server/models/Content')

const Comment = require('../../server/models/Comment')

const UserSurvey = require('../../server/models/UserSurvey')

const Measure = require('../../server/models/Measure')

const Appointment = require('../../server/models/Appointment')
const Coaching = require('../../server/models/Coaching')
const Message = require('../../server/models/Message')
const User = require('../../server/models/User')
require('../../server/models/LogbookDay')
require('../../server/models/UserSurvey')
require('../../server/models/UserQuestion')

const { getDatabaseUri } = require('../../config/config')

const { MONGOOSE_OPTIONS } = require('../../server/utils/database')

const { getDataModel } = require('../../config/config')
const mongoose = require('mongoose')
const lodash=require('lodash')
const moment=require('moment')

const checkDeleted = user => {
  const id = user._id.toString()
  return Promise.all(mongoose.modelNames().map(modelName => {
    return mongoose.models[modelName].find()
      .then(documents => documents.filter(doc => JSON.stringify(doc).includes(id)))
      .then(docs => {
        if (docs.length>0) {
          console.log(`${user.email}(${user.id}) is still in the ${modelName} document(s):${JSON.stringify(docs)}`)
        }
      })
  }))
}

/****** Have to remove:
user_id from Content: viewed_by, likdes, pins, shares
Coaching whose user is user_id / appointments linked to this coaching
Content: remove from [] viewed_by, likes, pins, shares
Comments: referenced by user
Messages: sender or receiver. Remove in likes / pins
*/
const cleanAccount = email => {
  return Group.deleteMany({})
    .then(() => User.findOne({email}))
    .then(user => {
      if (!user) { throw new Error(`${email} not found`)}
      //if (user.role != ROLE_CUSTOMER) { throw new Error(`${email} is not a customer`)}
      const id=user._id
      console.log(`Removing ${email} ${id}`)
      return Coaching.deleteMany({user: id})
        .then(() => Message.deleteMany({$or:[{sender: id}, {receiver: id}]}))
        .then(() => Message.updateMany({}, {$pull: {likes: id, pins: id}}))
        .then(() => Appointment.deleteMany({user: id}))
        .then(() => Measure.deleteMany({user: id}))
        .then(() => UserSurvey.deleteMany({user: id}))
        .then(() => Comment.deleteMany({user: id}))
        .then(() => Comment.updateMany({}, {$pull: {likes: id}}))
        .then(() => Content.updateMany({}, {$pull: {viewed_by:id, likes:id, pins:id, shares:id}}))
        .then(() => TeamMember.deleteMany({user: id}))
        .then(() => Diploma.deleteMany({user: id}))
        .then(() => user.delete())
    })
    .then(user => checkDeleted(user))
}



if (!getDataModel()=='smartdiet') {
  console.errro(`Run as smartdiet datamodel`)
}
const email=process.argv.slice(2, 4)
if (!email) {
  console.log(`Expected account email to delete`)
  process.exit(1)
}
console.log(`Cleaning account ${email}`)
return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => cleanAccount(email))
  //.then(console.log)
  .catch(console.error)
  .finally(() => process.exit())
