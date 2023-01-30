const url = require('url')
const mongoose=require('mongoose')
const Message = require('../../models/Message')
const Post = require('../../models/Post')
const UserSessionData = require('../../models/UserSessionData')
const {NotFoundError} = require('../../utils/errors')
const Program = require('../../models/Program')
const {getModel, removeData}=require('../../utils/database')

let ACTIONS = {
  put: ({parent, attribute, value}, user) => {
    let model = null
    return getModel(parent)
      .then(res => {
        model = res
        const mongooseModel = mongoose.connection.models[model]
        return mongooseModel.updateMany(
          {$or: [{_id: parent}, {origin: parent}]},
          {[attribute]: value},
          {runValidators: true},
        )
      })
  },

  publish: ({id}) => {
    return Program.findOneAndUpdate(
      {_id: id},
      {published: true},
      {new: true, runValidators: true},
    ).then(result => {
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
    const params = url.parse(referrer, true).query
    return UserSessionData.findOneAndUpdate(
      {user: user._id},
      {user: user._id},
      {upsert: true, runValidators: true},
    ).then(data => {
      const spentData = data?.spent_times.find(d => d?.resource == id)
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
    if (parent && child && parent!=child) {
      return removeChildFromParent(parent, child)
    }
    return removeData(child)
  },

  addChild: ({parent, child}) => {
    return addChild(parent, child)
  },

  next: ({id}, user, referrer) => {
    return getNext(id, user, referrer)
  },

  previous: ({id}) => {
    return getPrevious(id)
  },

  session: ({id}) => {
    return getSession(id)
  },

  sendMessage: ({destinee, contents}, sender) => {
    return Message.create({sender: sender._id, receiver: destinee, content: contents})
  },

  createPost: ({contents, media}, sender) => {
    return Post.create({contents, media, author: sender})
  },

}

let ALLOW_ACTION= () => true

const setAllowActionFn = fn => {
  ALLOW_ACTION = fn
}

const callAllowedAction = ({action, dataId, user}) => {
  return ALLOW_ACTION({action, dataId, user})
}

const addAction= (action, fn) => {
  ACTIONS[action]=fn
}

module.exports = {
  ACTIONS,
  setAllowActionFn,
  callAllowedAction,
  addAction,
}
