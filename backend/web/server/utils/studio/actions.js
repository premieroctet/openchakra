const { callPostCreateData } = require('../database')

const {
  getModel,
  loadFromDb,
  putAttribute,
  removeData
} = require('../database')
const mongoose = require('mongoose')
const { getDataModel } = require('../../../config/config')
const {
  generatePassword,
  validatePassword
} = require('../../../utils/passwords')
const bcrypt = require('bcryptjs')
const url = require('url')
const User = require('../../models/User')
const Message = require('../../models/Message')
const Post = require('../../models/Post')
const UserSessionData = require('../../models/UserSessionData')
const {NotFoundError} = require('../errors')
const Program = require('../../models/Program')
let fumoirMailing=null
if (getDataModel()=='fumoir') {
 fumoirMailing=require('../../plugins/fumoir/mailing')
}
let tipiMailing=null
if (getDataModel()=='all-inclusive') {
 tipiMailing = require('../../plugins/all-inclusive/mailing')
}

const {DEFAULT_ROLE} = require(`../../plugins/${getDataModel()}/consts`)

let ACTIONS = {
  put: ({parent, attribute, value}, user) => {
    const parsedValue=value ? JSON.parse(value) : value
    return putAttribute({id:parent, attribute, value: parsedValue, user})
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

  delete: ({id}) => {
    return removeData(id)
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

  sendMessage: ({destinee, content, attachment}, sender) => {
    return Message.create({sender: sender._id, receiver: destinee, content, attachment})
      .then(m => Message.findById(m._id).populate('sender').populate('receiver'))
      .then(m => {
        getDataModel()=='fumoir' && fumoirMailing && fumoirMailing.sendNewMessage({member: m.receiver, partner: m.sender})
        loadFromDb({model: 'message', id:m._id, fields:['receiver.email','receiver.firstname'], user:sender})
          .then(([message]) => {
            getDataModel()=='all-inclusive' && tipiMailing && tipiMailing.sendNewMessage(message.receiver)
          })
        return m
      })
  },

  createPost: ({contents, media}, sender) => {
    return Post.create({contents, media, author: sender})
  },

  register: props => {
    console.log(`Register with ${JSON.stringify(props)}`)
    return User.exists({email: props.email})
      .then(exists => {
        if (exists) {
          return Promise.reject(`Un compte avec le mail ${props.email} existe déjà`)
        }

        let promise
        if (props.password) {
          promise=validatePassword({...props})
        }
        else {
          //props.password=generatePassword()
          promise=Promise.resolve()
        }

        if (DEFAULT_ROLE && !props.role) {
          props.role=DEFAULT_ROLE
        }

        return promise
          .then(()=> {
            console.log(`DB create with ${JSON.stringify(props)}`)
            return User.create({...props})
          })
          .then(user => callPostCreateData({model: 'user', data:user}))
    })
  },

  addToContext: ({value, context, contextAttribute, append}) => {
    console.log(`${append ? 'Adding':'Removing'} target ${value} to context ${context}/${contextAttribute}`)
    return getModel(context)
      .then(modelName => {
        const model=mongoose.connection.models[modelName]
        return append ?
          model.findByIdAndUpdate(context, {$addToSet: {[contextAttribute]: value}})
          :
          model.findByIdAndUpdate(context, {$pull: {[contextAttribute]: value}})
      })
      .catch(err => {
        console.error(err)
      })
  },

}

let ALLOW_ACTION= () => Promise.resolve(true)

const setAllowActionFn = fn => {
  ALLOW_ACTION = fn
}

const callAllowedAction = (params) => {
  return ALLOW_ACTION(params)
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
