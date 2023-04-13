const {
  ACTIVITY,
  COMPANY_ACTIVITY,
  CONTENTS_TYPE,
  EVENT_TYPE,
  GENDER,
  HARDNESS,
  HOME_STATUS,
  ROLES,
  SPOON_SOURCE,
  TARGET_TYPE
} = require('./consts')
const {
  declareComputedField,
  declareEnumField,
  declareVirtualField,
  setPostCreateData,
  setPreCreateData,
  setPreprocessGet,
  simpleCloneModel,
} = require('../../utils/database')
const Offer = require('../../models/Offer')
const Content = require('../../models/Content')
const lodash=require('lodash')
const moment = require('moment')
const User = require('../../models/User')

const preprocessGet = ({model, fields, id, user}) => {
  if (model=='loggedUser') {
    model='user'
    id = user?._id || 'INVALIDID'
  }

  return Promise.resolve({model, fields, id})

}
setPreprocessGet(preprocessGet)

const USER_MODELS=['user', 'loggedUser']
USER_MODELS.forEach(m => {
  declareVirtualField({model: m, field: 'fullname', instance: 'String', requires: 'firstname,lastname'})
  declareVirtualField({model: m, field: 'password2', instance: 'String'})
  declareEnumField({model: m, field: 'home_status', enumValues:HOME_STATUS})
  declareEnumField({model: m, field: 'role', enumValues:ROLES})
  declareEnumField({model: m, field: 'gender', enumValues:GENDER})
  declareEnumField({model: m, field: 'activity', enumValues:ACTIVITY})
  declareVirtualField({model: m, field: 'spoons_count', instance: 'Number', requires: 'spoons'})
  declareVirtualField({model: m, field: 'spoons', instance: 'Array',
    requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'spoon'}}
  })
  declareVirtualField({model: m, field: 'available_contents', instance: 'Array',
    requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'contents'}}
  })
})

declareEnumField({model: 'company', field: 'activity', enumValues: COMPANY_ACTIVITY})
declareVirtualField({model: 'company', field: 'administrators', instance: 'Array',
  requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'user'}}
})

declareEnumField({model: 'content', field: 'type', enumValues:CONTENTS_TYPE})
declareVirtualField({model: 'content', field: 'likes_count', instance: 'Number', requires: 'likes'})
declareVirtualField({model: 'content', field: 'shares_count', instance: 'Number', requires: 'shares'})
declareVirtualField({model: 'content', field: 'comments_count', instance: 'Number', requires: 'comments'})

const EVENT_MODELS=['event', 'collectiveChallenge', 'individualChallenge', 'menu', 'webinar']
EVENT_MODELS.forEach(m => {
  declareVirtualField({model: m, field: 'type', instance: 'String', enumValues: EVENT_TYPE})
})

declareEnumField({model: 'individualChallenge', field: 'hardness', enumValues:HARDNESS})

declareEnumField({model: 'category', field: 'type', enumValues:TARGET_TYPE})
declareVirtualField({model: 'category', field: 'targets', instance: 'Array',
  requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'target'}}
})

declareEnumField({model: 'userSpoon', field: 'source', enumValues: SPOON_SOURCE})

declareEnumField({model: 'spoonGain', field: 'source', enumValues: SPOON_SOURCE})

declareVirtualField({model: 'offer', field: 'company', instance: 'offer',
  requires: '', multiple: false,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'company'}}
})

declareVirtualField({model: 'target', field: 'contents', instance: 'Array',
  requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'content'}}
})
declareVirtualField({model: 'target', field: 'groups', instance: 'Array',
  requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'group'}}
})
declareVirtualField({model: 'target', field: 'users', instance: 'Array',
  requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'user'}}
})

const getAvailableContents = (user, params, data) => {
  return Content.find()
    .then(contents => {
      const user_targets=user.targets.map(t => t._id.toString())
      const filtered_contents=contents.filter(c => {
        if (c.default) {
          return true
        }
        const content_targets=c.targets?.map(t => t._id.toString()) || []
        return lodash.isEqual(user_targets.sort(), content_targets.sort())
      })
      return filtered_contents
    })
}

declareComputedField('user', 'available_contents', getAvailableContents)
declareComputedField('loggedUser', 'available_contents', getAvailableContents)


const postCreate = ({model, params, data}) => {
  // Create company => duplicate offer
  if (model=='company') {
    return Offer.findById(data.offer)
      .then(offer => Offer.create(simpleCloneModel(data.offer)))
      .then(offer => {data.offer=offer._id; return data})
      .then(data => data.save())
  }
  if (model=='booking') {
    console.log(`Sending mail to ${data.booking_user.email} and admins for booking ${data._id}`)
    sendNewBookingToMember({booking:data})
    User.find({role: FUMOIR_MANAGER})
      .then(managers => Promise.allSettled(managers.map(manager => sendNewBookingToManager({booking:data, manager}))))
  }

  return Promise.resolve(data)
}

setPostCreateData(postCreate)

module.exports={
  getAvailableContents,
}
