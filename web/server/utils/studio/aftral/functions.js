const { cloneModel, getModel } = require('../../database');
const { BadRequestError, NotFoundError } = require('../../errors');
const mongoose =require('mongoose')
const lodash =require('lodash')
const Program=require('../../../models/Program')
const bcrypt=require('bcryptjs')
const Theme=require('../../../models/Theme')
const Session=require('../../../models/Session')
const User = require('../../../models/User')

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

const addChildToParent = (parentId, childId) => {
  let parentModel, childModel
  return Promise.all([getModel(parentId), getModel(childId)])
    .then(result => {
      [parentModel, childModel]=result
      const childPopulate=getChildAttribute(childModel)
      let childQuery=mongoose.connection.models[childModel].findById(childId)
      if (childPopulate) {
        childQuery=childQuery.populate(childPopulate)
      }
      return Promise.all([
        mongoose.connection.models[parentModel].findById(parentId),
        childQuery,
        Promise.resolve(childModel)
      ])
    })
    .then(([parent, child, childModel]) => {
      return parent.addChild(childModel, child)
    })
}

/**
const addChildToParent = (parentId, childId) => {
  let parentModel, childModel, parentAttribute, childAttribute
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
      return cloneModel({data: child, withOrigin: parentModel!='session'}) // Unlink from origin in session
        .then(cloned => {
          return needsTheme ? Theme.create({resources:[cloned]}):cloned
        })
        .then(child => {
          return mongoose.connection.models[parentModel].findByIdAndUpdate(parentId, {$push: {[parentAttribute]: child}})
        })
        .then(parent => {
          return mongoose.connection.models[parentModel].find({origin: parentId})
            .then(otherParents => {
              return Promise.all(otherParents.map( p => addChildToParent(p._id, childId)))
            })
        })
    })
}
*/

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
      if (model=='traineeTheme') {
        return TraineeSession.findOne({themes: theme_or_resource_id})
      }
      if (model=='traineeResource') {
        return TraineeTheme.findOne({resources: theme_or_resource_id})
          .then(theme => {
            return TraineeSession.findOne({themes: theme})
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

module.exports={
  addChildToParent,
  removeChildFromParent,
  moveChildInParent,
  getNext,
  getPrevious,
  getSession,
  login
}
