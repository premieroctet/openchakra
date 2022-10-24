const { BadRequestError, NotFoundError } = require('../../errors');
import mongoose from 'mongoose'
import lodash from 'lodash'
const bcrypt=require('bcryptjs')
import Program from '../../../models/Program'
import Theme from '../../../models/Theme'
import Session from '../../../models/Session'
const TraineeTheme = require('../../../models/TraineeTheme')
const TraineeResource = require('../../../models/TraineeResource')
const TraineeSession = require('../../../models/TraineeSession')
const User = require('../../../models/User');

const getModel = id => {
  const conn=mongoose.connection
  return Promise.all(conn.modelNames().map(model =>
    conn.models[model].exists({_id: id}).then(exists => (exists ? model : false)),
  ))
    .then(res => {
      return res.find(v => !!v)
    })
}

const getChildAttribute = model => {
  return {
    program: 'themes', session: 'themes', theme: 'resources', traineeTheme: 'resources',
  }[model]
}

const addThemeToProgram = (program, theme) => {
  return Program.findByIdAndUpdate(program._id, {$push: {themes: theme}})
}

const addResourceToProgram = (program, resource) => {
  return Theme.create({resources: [resource]})
    .then(th => {
      return addThemeToProgram(program, th)
    })
}

const createTraineeTheme = theme => {
  return Promise.all(theme.resources.map(r => {
    return TraineeResource.create({...r.toObject(), _id: undefined})
  }))
    .then(resources => {
      return TraineeTheme.create({...theme.toObject(), _id: undefined, resources: resources})
    })
}

const addThemeToTraineeSession = (traineeSession, theme) => {
  return createTraineeTheme(theme)
    .then(th => {
      return TraineeSession.update(traineeSession, {$push: {themes: th}})
    })
}

const addThemeToSession = (session, theme) => {
  return Session.findByIdAndUpdate(session._id, {$push: {themes: theme}})
    .then(session => {
      return TraineeSession.find({session: session})
        .then(traineeSessions => {
          return Promise.all(traineeSessions.map(ts => {
            return addThemeToTraineeSession(ts, theme)
          }))
        })
    })
}

const addResourceToSession = (session, resource) => {
  return Theme.create({resources: [resource]})
    .then(th => {
      return addThemeToSession(session, th)
    })
}

const addResourceToTheme = (theme, resource) => {
  return Theme.findByIdAndUpdate(theme._id, {$push: {resources: resource}})
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

const getThemesOrResources = id => {
  return getModel(id)
    .then(model => {
      return getTraineeSession(id)
        .then(session => {
          if (model=='traineeTheme') {
            return TraineeSession.findById(session._id)
              .populate('themes')
              .then(session => session.themes)
          }
          if (model=='traineeResource') {
            return TraineeSession.findById(session._id)
              .populate({path: 'themes', populate: 'resources'})
              .then(session => {
                return lodash.flatten(session.themes.map(t => t.resources))
              })
          }
        })
    })
}

const getNext = id => {
  return getThemesOrResources(id)
    .then(datalist => {
      const idx=datalist.findIndex(v => v._id.toString()==id)
      const nextIdx=idx==datalist.length-1 ?idx : idx+1
      return datalist[nextIdx]
    })
}

const getPrevious = id => {
  return getThemesOrResources(id)
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
          console.log(`Matched:${matched}`)
          if (!matched) {
            throw new NotFoundError(`Invalid email or password`)
          }
          return user
        })
    })
}

module.exports={addThemeToProgram, addThemeToSession, addResourceToSession,
  addResourceToProgram, addResourceToTheme,
  removeChildFromParent,
  getModel,
  moveChildInParent,
  getNext,
  getPrevious,
  getSession,
  login
}
