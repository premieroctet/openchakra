const Activity = require('../../server/models/Activity')
const Experience = require('../../server/models/Experience')
const Skill = require('../../server/models/Skill')
const Diploma = require('../../server/models/Diploma')
const Photo = require('../../server/models/Photo')
const Recommandation = require('../../server/models/Recommandation')
const Quotation = require('../../server/models/Quotation')
const QuotationDetail = require('../../server/models/QuotationDetail')
const Comment = require('../../server/models/Comment')
const Mission = require('../../server/models/Mission')
const JobUser = require('../../server/models/JobUser')
const Message = require('../../server/models/Message')
const User = require('../../server/models/User')
const { getDataModel, getDatabaseUri } = require('../../config/config')

const Request = require('../../server/models/Request')
const mongoose = require('mongoose')
const lodash=require('lodash')
const moment=require('moment')
require('../../server/models/AdminDashboard')
require('../../server/models/Company')
require('../../server/models/Contact')
require('../../server/models/Conversation')
const { MONGOOSE_OPTIONS } = require('../../server/utils/database')

const checkDeleted = user => {
  const id = user._id.toString()
  let error=false
  return Promise.all(mongoose.modelNames().filter(m => m!='user').map(modelName => {
    return mongoose.models[modelName].find()
      .then(documents => documents.filter(doc => JSON.stringify(doc).includes(id)))
      .then(docs => {
        if (docs.length>0) {
          error=true
          console.log(`${user.email}(${user.id}) is still in the ${modelName} document(s):${JSON.stringify(docs.map(d => d._id))}`)
        }
      })
  }))
  .then(() => {
    if (error) {throw new Error(`${user._id}(${user.email})inconsistent`)}
    return user
  })
}

/****** Have to remove:
user_id from Content: viewed_by, likdes, pins, shares
Coaching whose user is user_id / appointments linked to this coaching
Content: remove from [] viewed_by, likes, pins, shares
Comments: referenced by user
Messages: sender or receiver. Remove in likes / pins
*/
const cleanAccount = email => {

  if (getDataModel()!='all-inclusive') {
    console.error(`Model must be all-inclusive`)
    process.exit(1)
  }

  console.log(`Cleaning ${email}`)

  return User.findOne({email})
    .then(user => {
      if (!user) { throw new Error(`${email} not found`)}
      //if (user.role != ROLE_CUSTOMER) { throw new Error(`${email} is not a customer`)}
      const id=user._id
      return Request.deleteMany({user: id})
        .then(() => JobUser.find({user}).populate([
          {path: 'missions', populate:{path: 'quotations', populate:{path: 'details'}}},
          {path: 'diploma'},
          {path: 'photos'},
          {path: 'recommandations'},
          {path: 'experiences'},
          {path: 'skills'},
          {path: 'activities'},
        ]))
        .then(jobs => {
          const missions_ids=lodash(jobs).map('missions').flatten().map('_id').value()
          const quotations_ids=lodash(jobs).map('missions').flatten().map('quotations').flatten().map('_id').value()
          const details_ids=lodash(jobs).map('missions').flatten().map('quotations').flatten().map('details').flatten().map('_id').value()
          const diploma_ids=lodash(jobs).map('diploma').flatten().map('_id').value()
          const photos_ids=lodash(jobs).map('photos').flatten().map('_id').value()
          const recommandations_ids=lodash(jobs).map('recommandations').flatten().map('_id').value()
          const experiences_ids=lodash(jobs).map('experiences').flatten().map('_id').value()
          const skills_ids=lodash(jobs).map('skills').flatten().map('_id').value()
          const activities_ids=lodash(jobs).map('activities').flatten().map('_id').value()
          return Promise.all([
            Mission.deleteMany({_id: {$in: missions_ids}}),
            Quotation.deleteMany({_id: {$in: quotations_ids}}),
            QuotationDetail.deleteMany({_id: {$in: details_ids}}),
            Diploma.deleteMany({_id: {$in: diploma_ids}}),
            Photo.deleteMany({_id: {$in: photos_ids}}),
            Recommandation.deleteMany({_id: {$in: recommandations_ids}}),
            Experience.deleteMany({_id: {$in: experiences_ids}}),
            Skill.deleteMany({_id: {$in: skills_ids}}),
            Activity.deleteMany({_id: {$in: activities_ids}}),
          ])
        })
        .then(() => Mission.deleteMany({user: id}))
        .then(() => JobUser.deleteMany({user: id}))
        .then(() => JobUser.updateMany({$pull: {pins: id}}))
        .then(() => Message.deleteMany({$or:[{sender:id}, {receiver:id}]}))
        .then(() => Comment.deleteMany({user: id}))
        // Check if no references before deleting the user
        .then(() => checkDeleted(user))
        .then(res => user.delete())
  })
}


if (require.main===module) {
  console.log('***************** MAIN')
  const email=process.argv.slice(2, 4)
  if (!email) {
    console.log(`Expected account email to delete`)
    process.exit(1)
  }
  console.log(`Cleaning account ${email}`)
  mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
    .then(() => cleanAccount(email))
    //.then(console.log)
    .catch(console.error)
    .finally(() => process.exit())
}

module.exports={
  cleanAccount
}
