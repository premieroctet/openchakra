const mongoose =require('mongoose')
const lodash =require('lodash')
const bcrypt=require('bcryptjs')
const {cloneModel, getModel} = require('../../database')
const {BadRequestError, NotFoundError} = require('../../errors')
const Program=require('../../../models/Program')
const Theme=require('../../../models/Theme')
const Session=require('../../../models/Session')
const User = require('../../../models/User')
const Message = require('../../../models/Message')

const getChildAttribute = model => {
  return {
    program: 'themes', session: 'themes', theme: 'resources', traineeTheme: 'resources',
  }[model]
}

const ALLOWED_CHILDREN={
  'session': ['theme', 'resource'],
  'program': ['theme', 'resource'],
  'theme': ['resource'],
}

const addChild = (parentId, childId, level=0) => {
  let parentModel, childModel, parentAttribute, childAttribute, cloned
  return Promise.all([getModel(parentId), getModel(childId)])
    .then(result => {
      [parentModel, childModel]=result
      parentAttribute=getChildAttribute(parentModel)
      childAttribute=getChildAttribute(childModel)
      if (!ALLOWED_CHILDREN[parentModel]?.includes(childModel)) {
        throw new Error(`Can not add child ${childModel} in parent ${parentModel}`)
      }
      return Promise.all([
        mongoose.connection.models[parentModel].findById(parentId).populate(parentAttribute),
        mongoose.connection.models[childModel].findById(childId).populate(childAttribute),
      ])
    })
    .then(([parent, child]) => {
      const needsTheme = ['session', 'program'].includes(parentModel) && childModel=='resource'
      return cloneModel({data: child, withOrigin: !(parentModel=='session' && !parent.origin)}) // Unlink from origin in session
        .then(res => {
          cloned=res
          return needsTheme ? Theme.create({resources: [cloned]}):cloned
        })
        .then(child => {
          return mongoose.connection.models[parentModel].findByIdAndUpdate(parentId, {$push: {[parentAttribute]: child}})
        })
        .then(parent => {
          return mongoose.connection.models[parentModel].find({origin: parent._id})
            .then(otherParents => {
              return Promise.all(otherParents.map(p => addChild(p._id, cloned._id, level+1)))
            })
        })
    })
}

const removeChildFromParent = (parent_id, child_id) => {
  return getModel(parent_id)
    .then(parentModel => {
      const model=mongoose.connection.models[parentModel]
      const subAttr=getChildAttribute(parentModel)
      return model.findByIdAndUpdate(parent_id, {$pull: {[subAttr]: child_id}})
    })
}

const moveItem = (itemId, items, up) => {
  const index=items.findIndex(i => i._id.toString()==itemId.toString())
  if (index==-1) {
    throw new Error(`${itemId}not found in ${items}`)
  }
  if ((up && index==0) || (!up && index==items.length-1)) {
    return items
  }
  const delta=up ? -1 : 1
  const temp=items[index+delta]
  items[index+delta]=items[index]
  items[index]=temp
  return items
}

const moveChildInParent = (parent_id, child_id, up) => {
  return getModel(parent_id)
    .then(parentModel => {
      const model=mongoose.connection.models[parentModel]
      const subAttr=getChildAttribute(parentModel)
      return model.findById(parent_id).populate(subAttr)
        .then(parent => {
          const newChildren=moveItem(child_id, parent[subAttr], up)
          return model.findByIdAndUpdate(parent_id, {[subAttr]: newChildren})
        })
    })
}

const getTraineeSession = theme_or_resource_id => {
  return getModel(theme_or_resource_id)
    .then(model => {
      if (model=='theme') {
        return Session.findOne({themes: theme_or_resource_id})
      }
      if (model=='resource') {
        return Theme.findOne({resources: theme_or_resource_id})
          .then(theme => {
            return Session.findOne({themes: theme})
          })
      }
    })
}

const getResourcesForSession = resource_id => {
  return getModel(resource_id)
    .then(model => {
      if (model!='resource') {
        throw new Error(`Id ${resource_id} is not a resource`)
      }
      return Theme.findOne({resources: resource_id})
    })
    .then(theme => {
      return Session.findOne({themes: theme})
        .populate({path: 'themes', populate: 'resources'})
    })
    .then(session => {
      const res=lodash.flatten(session.themes.map(t => t.resources))
      return res
    })
}

const getNext = id => {
  return getResourcesForSession(id)
    .then(datalist => {
      const idx=datalist.findIndex(v => v._id.toString()==id)
      const nextIdx=idx==datalist.length-1 ?idx : idx+1
      return datalist[nextIdx]
    })
}

const getPrevious = id => {
  return getResourcesForSession(id)
    .then(datalist => {
      const idx=datalist.findIndex(v => v._id.toString()==id)
      const prevIdx=idx==0 ?idx : idx-1
      return datalist[prevIdx]
    })
}

const getSession = id => {
  return getTraineeSession(id)
}

const login = (email, password) => {
  console.log(`Login with ${email} and ${password}`)
  return User.findOne({email})
    .then(user => {
      if (!user) {
        throw new NotFoundError(`Invalid email or password`)
      }
      console.log(`Comparing ${password} and ${user.password}`)
      return bcrypt.compare(password, user.password)
        .then(matched => {
          // TODO : to test
          matched=true
          console.log(`Matched:${matched}`)
          if (!matched) {
            throw new NotFoundError(`Invalid email or password`)
          }
          return user
        })
    })
}

const putAttribute = ({parent, attribute, value}) => {
  console.log(`Putting ${parent} ${attribute} to ${value}`)
  let mongooseModel=null
  return getModel(parent)
    .then(model => {
      mongooseModel=mongoose.connection.models[model]
      return mongooseModel.updateMany(
        {$or: [{_id: parent}, {origin: parent}]},
        {[attribute]: value})
    })
}

const filterDataUser = ({model, data, user}) => {
  if (model=='session') {
    data=data.filter(d =>
      (user.role=='apprenant' ? d.trainee?._id.toString()==user._id.toString()
        : user.roles=='formateur' ? d.trainers.map(t => t._id.toString()).includes(user._id.toString()) && !d.trainee
          : !d.trainee),
    )
  }
  if (model=='resource' && user.role=='concepteur') {
    console.log('filter resources for concepteur')
    return Theme.find()
      .then(themes => {
        data=data.filter(d => !d.origin)
        const themesResources=lodash(themes).map(t => t.resources).flatten().map(r => r._id.toString())
        data=data.filter(d => !themesResources.includes(d._id.toString()))
        return data
      })
  }
  if (model=='message') {
    const userId=user._id.toString()
    data=data.filter(d => {
      const destIds=lodash(d)
        .map(d => [d.sender._id, d.destinee_user?._id, d.destinee_session?.trainees, d.destinee_session?.trainers])
        .flattenDeep()
        .value()
      return destIds.some(i => i?.toString()==userId)
    })
  }
  return data
}

const getContacts = (user, id) => {
  return Session.find({origin: null, $or: [{trainees: user._id}, {trainers: user._id}]})
    .populate('trainees')
    .populate('trainers')
    .then(sessions => {
      let allContacts=lodash(sessions)
        .map(s => [...s.trainers, ...s.trainees])
        .flatten()
        .uniqBy(user => user._id.toString())
        .value()
      allContacts=[...allContacts, ...lodash.uniqBy(sessions, s => s.contact_name)]
      console.log(allContacts)
      return allContacts.map(contact => ({_id: contact._id, name: contact.contact_name}))
    })
}

const sendMessage = (sender, destinee, contents) => {
  console.log(`Received $${sender}, ${destinee}, ${contents}`)
  return getModel(destinee)
    .then(model => {
      let data={sender: sender._id, contents: contents}
      if (model=='session') {
        data.destinee_session=destinee
      }
      else if (model=='user') {
        data.destinee_user=destinee
      }
      return Message.create({sender: sender._id, ...data})
    })
}

module.exports={
  addChild,
  removeChildFromParent,
  moveChildInParent,
  getNext,
  getPrevious,
  getSession,
  login,
  putAttribute,
  filterDataUser,
  getContacts,
  sendMessage,
}
