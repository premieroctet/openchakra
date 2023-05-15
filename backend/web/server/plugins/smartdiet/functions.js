const mongoose = require('mongoose')
const {
  declareComputedField,
  declareEnumField,
  declareVirtualField,
  getModel,
  idEqual,
  setPostCreateData,
  setPreCreateData,
  setPreprocessGet,
  simpleCloneModel
} = require('../../utils/database')

const {
  ACTIVITY,
  COMPANY_ACTIVITY,
  CONTENTS_TYPE,
  ECOSCORE,
  EVENT_TYPE,
  GENDER,
  GROUPS_CREDIT,
  HARDNESS,
  HOME_STATUS,
  NUTRISCORE,
  ROLES,
  SPOON_SOURCE,
  TARGET_TYPE,
  UNIT
} = require('./consts')
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

const preCreate = ({model, params, user}) => {
  if (['comment', 'measure', 'content', 'collectiveChallenge', 'individualChallenge', 'webinar', 'menu'].includes(model)) {
    params.user=user
  }
  if (['message'].includes(model)) {
    params.sender=user
  }
  return Promise.resolve({model, params})
}

setPreCreateData(preCreate)


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
      options: {ref: 'userSpoon'}}
  })
  declareVirtualField({model: m, field: '_all_contents', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'content'}}
  })
  declareVirtualField({model: m, field: 'contents', instance: 'Array',
    requires: '_all_contents', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'content'}}
  })
  declareVirtualField({model: m, field: 'webinars', instance: 'Array',
    requires: 'company,company.webinars,skipped_events,passed_events', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'webinar'}}
  })
  declareVirtualField({model: m, field: '_all_individual_challenges', instance: 'Array',
    requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'individualChallenge'}}
  })
  declareVirtualField({model: m, field: 'individual_challenges', instance: 'Array',
    requires: '_all_individual_challenges,skipped_events,passed_events', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'individualChallenge'}}
  })
  declareVirtualField({model: m, field: '_all_menus', instance: 'Menu',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'menu'}}
  })
  declareVirtualField({model: m, field: 'menu', instance: 'Menu',
    multiple: false,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'menu'}}
  })
  declareVirtualField({model: m, field: 'collective_challenges', instance: 'Array',
    requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'collectiveChallenge'}}
  })
  declareVirtualField({model: m, field: 'available_groups', instance: 'Array',
    requires: 'targets,company.groups,company.groups.targets,registered_groups', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'group'}}
  })
  declareVirtualField({model: m, field: 'registered_groups', instance: 'Array',
    requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'group'}}
  })
  declareVirtualField({model: m, field: 'measures', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'measure'}}
  })
  declareVirtualField({model: m, field: 'last_measures', instance: 'Measure',
    requires:'measures', multiple: false,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'measure'}}
  })
  declareVirtualField({model: m, field: 'pinned_messages', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'message'}}
  })
  declareVirtualField({model: m, field: 'pinned_contents', instance: 'Array',
    multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'content'}}
  })
})

declareEnumField({model: 'company', field: 'activity', enumValues: COMPANY_ACTIVITY})
declareVirtualField({model: 'company', field: 'administrators', instance: 'Array',
  requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'user'}}
})
declareVirtualField({model: 'company', field: 'webinars', instance: 'Array',
  requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'webinar'}}
})
declareVirtualField({model: 'company', field: 'groups', instance: 'Array',
  requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'group'}}
})
declareVirtualField({model: 'company', field: 'likes_count', instance: 'Number'})
declareVirtualField({model: 'company', field: 'comments_count', instance: 'Number'})
declareVirtualField({model: 'company', field: 'shares_count', instance: 'Number'})
declareVirtualField({model: 'company', field: 'contents_count', instance: 'Number'})
declareVirtualField({model: 'company', field: 'groups_count', instance: 'Number', requires:'groups'})

declareEnumField({model: 'content', field: 'type', enumValues:CONTENTS_TYPE})
declareVirtualField({model: 'content', field: 'likes_count', instance: 'Number', requires: 'likes'})
declareVirtualField({model: 'content', field: 'shares_count', instance: 'Number', requires: 'shares'})
declareVirtualField({model: 'content', field: 'comments', instance: 'Array',
  requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'comment'}}
})
declareVirtualField({model: 'content', field: 'liked', instance: 'Boolean', requires:'likes'})
declareVirtualField({model: 'content', field: 'pinned', instance: 'Boolean', requires:'pins'})

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
declareEnumField({model: 'offer', field: 'groups_credit', enumValues: GROUPS_CREDIT})

declareVirtualField({model: 'target', field: 'contents', instance: 'Array',
  multiple: true,
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

declareEnumField({model: 'recipe', field: 'nutriscore', enumValues: NUTRISCORE})
declareEnumField({model: 'recipe', field: 'ecoscore', enumValues: ECOSCORE})

declareEnumField({model: 'ingredient', field: 'unit', enumValues: UNIT})

declareVirtualField({model: 'group', field: 'messages', instance: 'Array',
  multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'message'}}
})

declareVirtualField({model: 'message', field: 'pinned', instance: 'Boolean', requires:'pins'})

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

const getDataLiked = (user, params, data) => {
  const liked=data?.likes?.some(l => idEqual(l._id, user._id))
  return Promise.resolve(liked)
}

const setDataLiked= ({id, attribute, value, user}) => {
  console.log(`Liking:${value}`)
  return getModel(id, ['comment', 'message', 'content'])
    .then(model => {
      if (value) {
        // Set liked
        return mongoose.models[model].findByIdAndUpdate(id, {$addToSet: {likes: user._id}})
      }
      else {
        // Remove liked
        return mongoose.models[model].findByIdAndUpdate(id, {$pullAll: {likes: [user._id]}})
      }
    })
}

const getDataPinned = (user, params, data) => {
  const liked=data?.pins?.some(l => idEqual(l._id, user._id))
  return Promise.resolve(liked)
}

const setDataPinned = ({id, attribute, value, user}) => {
  console.log(`Pinnning:${value}`)
  return getModel(id, ['message', 'content'])
    .then(model => {
      if (value) {
        // Set liked
        return mongoose.models[model].findByIdAndUpdate(id, {$addToSet: {pins: user._id}})
      }
      else {
        // Remove liked
        return mongoose.models[model].findByIdAndUpdate(id, {$pullAll: {pins: [user._id]}})
      }
    })
}

declareComputedField('user', 'available_contents', getAvailableContents)
declareComputedField('loggedUser', 'available_contents', getAvailableContents)
declareComputedField('comment', 'liked', getDataLiked, setDataLiked)
declareComputedField('message', 'liked', getDataLiked, setDataLiked)
declareComputedField('content', 'liked', getDataLiked, setDataLiked)
declareComputedField('message', 'pinned', getDataLiked, setDataLiked)
declareComputedField('content', 'pinned', getDataPinned, setDataPinned)


const postCreate = ({model, params, data}) => {
  // Create company => duplicate offer
  if (model=='company') {
    return Offer.findById(data.offer)
      .then(offer => Offer.create(simpleCloneModel(offer)))
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
