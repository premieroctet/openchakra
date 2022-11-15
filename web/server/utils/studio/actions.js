const UserSessionData = require('../../models/UserSessionData');
const Resource = require('../../models/Resource')
const {NotFoundError} = require('../errors')
const Program = require('../../models/Program')
const {
  addChild,
  moveChildInParent,
  removeChildFromParent,
  getNext, getPrevious,
  getSession,
  login,
  putAttribute,
  sendMessage,
} = require('./aftral/functions')
const url=require('url')

const ACTIONS={

  login: ({email, password}) => {
    return login(email, password)
  },

  put: ({parent, attribute, value}) => {
    return putAttribute({parent, attribute, value})
  },

  publish: ({id}) => {
    return Program.findOneAndUpdate(
      {_id: id},
      {published: true},
      {new: true},
    )
      .then(result => {
        console.log(`result publish ${JSON.stringify(result)}`)
        if (!result) {
          throw new NotFoundError(`Program ${id} not found`)
        }
        return result
      })
  },

  levelUp: ({parent, child}) => {
    return moveChildInParent(parent, child, true)
  },

  levelDown: ({parent, child}) => {
    return moveChildInParent(parent, child, false)
  },

  addSpentTime: ({id, duration}, user, referrer) => {
    const params=url.parse(referrer, true).query
    console.log('Adding')
    //console.log(`Params:${params}`)
    return UserSessionData.findOneAndUpdate(
      {session: params.session, user: user._id},
      {},
      {upsert: true}
    )
    .then(data => {
      console.log(data)
      const spentData=data.spent_times.find(d => d.resource==id)
      if (spentData) {
        spentData.spent_time += duration
      }
      else {
        data.spent_times.push({resource: id, spent_time: duration})
      }
      return data.save()
    })
  },

  delete: ({parent, child}) => {
    return removeChildFromParent(parent, child)
  },

  addChild: ({parent, child}) => {
    return addChild(parent, child)
  },

  next: ({id}) => {
    return getNext(id)
  },

  previous: ({id}) => {
    return getPrevious(id)
  },

  session: ({id}) => {
    return getSession(id)
  },

  sendMessage: ({destinee, contents}, sender) => {
    console.log(`Destinee:${destinee},contents:${contents},sender:${sender}`)
    return sendMessage(sender, destinee, contents)
  },

}

module.exports={ACTIONS}
