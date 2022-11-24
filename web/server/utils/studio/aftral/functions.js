const {
  cloneModel,
  declareComputedField,
  formatTime,
  getModel
} = require('../../database');
const url=require('url')
const mongoose =require('mongoose')
const lodash =require('lodash')
const bcrypt=require('bcryptjs')
const {BadRequestError, NotFoundError} = require('../../errors')
const UserSessionData = require('../../../models/UserSessionData');
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
        throw new Error(`Id ${resource_id} is not a resource but a ${model}`)
      }
      return Theme.findOne({resources: resource_id})
    })
    .then(theme => {
      return Session.findOne({themes: theme})
        .populate({path: 'themes', populate: 'resources'})
    })
    .then(session => {
      if (!session) {
        return []
      }
      const res=lodash.flatten(session.themes.map(t => t.resources))
      return res
    })
}

const getNextResource = id => {
  return getResourcesForSession(id)
    .then(datalist => {
      const idx=datalist.findIndex(v => v._id.toString()==id)
      if (idx==datalist.length-1) {
        throw new NotFoundError('Last resource')
      }
      return datalist[idx+1]
    })
}

const getPrevResource = id => {
  return getResourcesForSession(id)
    .then(datalist => {
      const idx=datalist.findIndex(v => v._id.toString()==id)
      if (idx==0) {
        throw new NotFoundError('First resource')
      }
      return datalist[idx-1]
    })
}

// Mark ressource finished then return next
const getNext = (id, user, referrer) => {
  const params=url.parse(referrer, true).query
  return UserSessionData.findOneAndUpdate(
    {user: user._id},
    {user: user._id, $addToSet:{finished: id}},
    {upsert: true}
  )
  .then(() => {
    return getNextResource(id)
  })
}

const getPrevious = id => {
  return getPrevResource(id)
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
      (user.role=='apprenant' ? user.sessions.includes(d._id)
        : user.roles=='formateur' ? d.trainers.map(t => t._id.toString()).includes(user._id.toString()) && !d.trainee
          : !d.trainee),
    )
  }
  if (model=='resource') {
    return Theme.find()
      .then(themes => {
        data=data.filter(d => !d.origin)
        const themesResources=lodash(themes).map(t => t.resources).flatten().map(r => r._id.toString())
        data=data.filter(d => !themesResources.includes(d._id.toString()))
        return data
      })
  }

  if (model=='theme') {
    data=data.filter(d => !d.origin)
    return Promise.all([Session.find(), Program.find()])
      .then(parents => {
        const themes=lodash(parents).flatten().map(t => t.themes).flatten().map(r => r._id.toString())
        console.log(`themes:${themes}`)
        data=data.filter(d => !themes.includes(d._id.toString()))
        return data
      })
  }


  if (model=='message') {
    const userId=user._id.toString()
    data=data.filter(d => {
      const destIds=lodash([d.sender && d.sender._id,
        d.destinee_user && d.destinee_user?._id,
        d.destinee_session?.trainees?.map(t => t._id),
        d.destinee_session?.trainers?.map(t => t._id)])
        .flattenDeep()
        .value()
      return destIds.some(i => i?.toString()==userId)
    })
    data=lodash.orderBy(data, 'date', 'desc')
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

const getResourceSpentTime = async (user, queryParams, resource) => {
  const data=await UserSessionData.find({user: user._id})
  const spent=lodash(data)
    .map(d => d.spent_times)
    .flatten()
    .find(sp => sp.resource._id.toString()==resource._id.toString())
  return spent?.spent_time || 0
}

/** Not finished, not in progress:
+  Parent theme ordered:
+   - first in theme: "available"
+   - next of 'finished' one : "available"
+   - else "to come"
+  Parent theme unordered: available
+  */
const getResourceStatus = async (user, queryParams, resource) => {
  const [data, spent]=await Promise.all([
    UserSessionData.findOne({user: user._id}, {finished:1}),
    getResourceSpentTime(user, queryParams, resource)
  ])
  const finished=data?.finished.find(r => r.toString()==resource._id.toString())
  if (finished) {
    return 'Terminé'
  }
  if (spent>0) {
    return `En cours`
  }
  const theme=await Theme.findOne({'resources': resource}, {ordered:1})
  if (!theme) {
    return ''
  }
  return theme.ordered ? 'A venir' : 'Disponible'
}

const getResourceSpentTimeStr = async (user, queryParams, resource) => {
  const res=await getResourceSpentTime(user, queryParams, resource)
  const str=formatTime(res)
  return str
}

const getThemeSpentTime = async (user, queryParams, theme) => {
  const data=await Theme.findById(theme._id.toString())
  const results=await Promise.all(data.resources.map(r => getResourceSpentTime(user, queryParams, r._id)))
  const spent=lodash.sum(results)
  return spent
}

const getThemeSpentTimeStr = async (user, queryParams, theme) => {
  const res=await getThemeSpentTime(user, queryParams, theme)
  return formatTime(res)
}

const getSessionSpentTime = async (user, queryParams, session) => {
  const data=await Session.findById(session._id.toString())
  if (!data) { return 0}
  const results=await Promise.all(data.themes.map(t => getThemeSpentTime(user, queryParams, t._id)))
  const spent=lodash.sum(results)
  return spent
}

const getSessionSpentTimeStr = async (user, queryParams, session) => {
  const res=await getSessionSpentTime(user, queryParams, session)
  return formatTime(res)
}

const getThemeProgress = async (user, queryParams, theme) => {
  const userData=await UserSessionData.findOne({user: user._id})
  const finishedResources=theme.resources.filter(r => userData.finished.includes(r._id))
  return {finished: finishedResources.length, total: theme.resources.length}
}

const getThemeProgressStr = async (user, queryParams, theme) => {
  const progress=await getThemeProgress(user, queryParams, theme)
  return `${progress.finished}/${progress.total}`
}

const getThemeProgressPercent = async (user, queryParams, theme) => {
  const progress=await getThemeProgress(user, queryParams, theme)
  return progress.finished*1.0/progress.total*100
}

const getSessionProgress = async (user, queryParams, session) => {
  const sess=await Session.findById(session._id).populate('themes')
  if (!sess) { return {finished:0, total:0}}
  const userData=await UserSessionData.findOne({user: user._id})
  const resources=lodash.flatten(sess.themes.map(t => t.resources))
  const finishedResources=resources.filter(r => userData.finished.includes(r._id))
  return {finished: finishedResources.length, total: resources.length}
}

const getSessionProgressStr = async (user, queryParams, session) => {
  const progress=await getSessionProgress(user, queryParams, session)
  return `${progress.finished}/${progress.total}`
}

const getSessionProgressPercent = async (user, queryParams, session) => {
  const progress=await getSessionProgress(user, queryParams, session)
  return progress.finished*1.0/progress.total*100
}

declareComputedField('resource', 'spent_time', getResourceSpentTime)
declareComputedField('resource', 'spent_time_str', getResourceSpentTimeStr)
declareComputedField('resource', 'status', getResourceStatus)

declareComputedField('theme', 'spent_time', getThemeSpentTime)
declareComputedField('theme', 'spent_time_str', getThemeSpentTimeStr)
declareComputedField('theme', 'progress_str', getThemeProgressStr)
declareComputedField('theme', 'progress_percent', getThemeProgressPercent)

declareComputedField('session', 'spent_time', getSessionSpentTime)
declareComputedField('session', 'spent_time_str', getSessionSpentTimeStr)
declareComputedField('session', 'progress_str', getSessionProgressStr)
declareComputedField('session', 'progress_percent', getSessionProgressPercent)

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
