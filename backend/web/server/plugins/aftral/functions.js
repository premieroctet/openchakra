const NodeCache = require('node-cache')
const mongoose = require('mongoose')
const lodash = require('lodash')
const {
  cloneModel,
  declareComputedField,
  declareVirtualField,
  formatTime,
  getModel,
  setFilterDataUser,
  setPreprocessGet,
} = require('../../utils/database')
const {NotFoundError} = require('../../utils/errors')
const UserSessionData = require('../../models/UserSessionData')
const Program = require('../../models/Program')
const Theme = require('../../models/Theme')
const Session = require('../../models/Session')
require('../../models/User')
const Message = require('../../models/Message')
const {
  RES_AVAILABLE,
  RES_CURRENT,
  RES_FINISHED,
  RES_TO_COME,
  STATUS,
} = require('./consts')

const myCache = new NodeCache({stdTTL: 15, checkperiod: 10})

const getChildAttribute = model => {
  return {
    program: 'themes',
    session: 'themes',
    theme: 'resources',
    traineeTheme: 'resources',
  }[model]
}

const ALLOWED_CHILDREN = {
  session: ['theme', 'resource'],
  program: ['theme', 'resource'],
  theme: ['resource'],
}

const addChild = (parentId, childId, level = 0) => {
  let parentModel, childModel, parentAttribute, childAttribute, cloned
  return Promise.all([getModel(parentId), getModel(childId)])
    .then(result => {
      [parentModel, childModel] = result
      parentAttribute = getChildAttribute(parentModel)
      childAttribute = getChildAttribute(childModel)
      if (!ALLOWED_CHILDREN[parentModel]?.includes(childModel)) {
        throw new Error(
          `Can not add child ${childModel} in parent ${parentModel}`,
        )
      }
      return Promise.all([
        mongoose.connection.models[parentModel]
          .findById(parentId)
          .populate(parentAttribute),
        mongoose.connection.models[childModel]
          .findById(childId)
          .populate(childAttribute),
      ])
    })
    .then(([parent, child]) => {
      const needsTheme =
        ['session', 'program'].includes(parentModel) &&
        childModel == 'resource'
      return cloneModel({
        data: child,
        withOrigin: !(parentModel == 'session' && !parent.origin),
      }) // Unlink from origin in session
        .then(res => {
          cloned = res
          return needsTheme ? Theme.create({resources: [cloned]}) : cloned
        })
        .then(child => {
          return mongoose.connection.models[parentModel].findByIdAndUpdate(
            parentId,
            {
              $push: {[parentAttribute]: child},
            },
          )
        })
        .then(parent => {
          return mongoose.connection.models[parentModel]
            .find({origin: parent._id})
            .then(otherParents => {
              return Promise.all(
                otherParents.map(p => addChild(p._id, cloned._id, level + 1)),
              )
            })
        })
    })
}

const removeChildFromParent = (parent_id, child_id) => {
  return getModel(parent_id).then(parentModel => {
    const model = mongoose.connection.models[parentModel]
    const subAttr = getChildAttribute(parentModel)
    return model.findByIdAndUpdate(parent_id, {
      $pull: {[subAttr]: child_id},
    })
  })
}

const moveItem = (itemId, items, up) => {
  const index = items.findIndex(i => i._id.toString() == itemId.toString())
  if (index == -1) {
    throw new Error(`Item ${itemId} not found amongst ${items.map(i => i._id)}`)
  }
  if ((up && index == 0) || (!up && index == items.length - 1)) {
    return items
  }
  const delta = up ? -1 : 1
  const temp = items[index + delta]
  items[index + delta] = items[index]
  items[index] = temp
  return items
}

const moveChildInParent = (parent_id, child_id, up) => {
  return getModel(parent_id).then(parentModel => {
    const model = mongoose.connection.models[parentModel]
    const subAttr = getChildAttribute(parentModel)
    return model
      .findById(parent_id)
      .populate(subAttr)
      .then(parent => {
        const newChildren = moveItem(child_id, parent[subAttr], up)
        return model.findByIdAndUpdate(parent_id, {[subAttr]: newChildren})
      })
  })
}

const getTraineeSession = theme_or_resource_id => {
  return getModel(theme_or_resource_id).then(model => {
    if (model == 'theme') {
      return Session.findOne({themes: theme_or_resource_id})
    }
    if (model == 'resource') {
      return Theme.findOne({resources: theme_or_resource_id}).then(theme => {
        return Session.findOne({themes: theme})
      })
    }
  })
}

const getResourcesForSession = resource_id => {
  return getModel(resource_id)
    .then(model => {
      if (model != 'resource') {
        throw new Error(`Id ${resource_id} is not a resource but a ${model}`)
      }
      return Theme.findOne({resources: resource_id})
    })
    .then(theme => {
      return Session.findOne({themes: theme}).populate({
        path: 'themes',
        populate: 'resources',
      })
    })
    .then(session => {
      if (!session) {
        return []
      }
      const res = lodash.flatten(session.themes.map(t => t.resources))
      return res
    })
}

// Get next theme in session
const getNextTheme = theme_id => {
  return Session.findOne({themes: theme_id})
    .populate('themes')
    .then(session => {
      const idx = session.themes.findIndex(
        t => t._id.toString() == theme_id.toString(),
      )
      if (idx == session.themes.length - 1) {
        return null
      }
      return themes[idx + 1]
    })
}

// Get previous theme in session
const getPrevTheme = theme_id => {
  return Session.findOne({themes: theme_id})
    .populate('themes')
    .then(session => {
      const idx = session.themes.findIndex(
        v => v._id.toString() == theme_id.toString(),
      )
      if (idx == 0) {
        return null
      }
      return session.themes[idx - 1]
    })
}

const getNextResource = id => {
  return getResourcesForSession(id).then(datalist => {
    const idx = datalist.findIndex(v => v._id.toString() == id)
    if (idx == datalist.length - 1) {
      return null
    }
    return datalist[idx + 1]
  })
}

const getPrevResource = id => {
  return getResourcesForSession(id).then(datalist => {
    const idx = datalist.findIndex(v => v._id.toString() == id)
    if (idx == 0) {
      return null
    }
    return datalist[idx - 1]
  })
}

// Mark ressource finished then return next
const getNext = (id, user) => {
  return UserSessionData.findOneAndUpdate(
    {user: user._id},
    {user: user._id, $addToSet: {finished: id}},
    {upsert: true},
  ).then(() => {
    const nextRes = getNextResource(id)
    if (!nextRes) {
      throw new NotFoundError('Last resource')
    }
    return nextRes
  })
}

const getPrevious = id => {
  const prevRes = getPrevResource(id)
  if (!prevRes) {
    throw new NotFoundError('First resource')
  }
  return prevRes
}

const getSession = id => {
  return getTraineeSession(id)
}

const putAttribute = ({parent, attribute, value, user}) => {
  console.log(`Putting ${parent} ${attribute} to ${value}`)
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
    .then(res => {
      if (model == 'resource' && attribute == 'annotation') {
        // return setVirtualAttribute({model, parent, attribute, value, user})
        return setResourceAnnotation({
          model,
          parent,
          attribute,
          value,
          user,
        }).then(() => res)
      }
      return Promise.resolve(res)
    })
}

const filterDataUser = ({model, data, user}) => {
  if (model == 'session') {
    data = data.filter(d =>
      (user.role == 'apprenant'
        ? user.sessions.includes(d._id)
        : user.role == 'formateur'
          ? d.trainers.map(t => t._id.toString()).includes(user._id.toString()) &&
          !d.trainee
          : !d.trainee),
    )
  }
  if (model == 'resource') {
    return Theme.find().then(themes => {
      data = data.filter(d => !d.origin)
      const themesResources = lodash(themes)
        .map(t => t.resources)
        .flatten()
        .map(r => r._id.toString())
      data = data.filter(d => !themesResources.includes(d._id.toString()))
      return data
    })
  }

  if (model == 'theme') {
    data = data.filter(d => !d.origin)
    return Promise.all([Session.find(), Program.find()]).then(parents => {
      const themes = lodash(parents)
        .flatten()
        .map(t => t.themes)
        .flatten()
        .map(r => r._id.toString())
      data = data.filter(d => !themes.includes(d._id.toString()))
      return data
    })
  }

  if (model == 'message') {
    const userId = user._id.toString()
    data = data.filter(d => {
      const destIds = lodash([
        d.sender && d.sender._id,
        d.destinee_user && d.destinee_user?._id,
        d.destinee_session?.trainees?.map(t => t._id),
        d.destinee_session?.trainers?.map(t => t._id),
      ])
        .flattenDeep()
        .value()
      return destIds.some(i => i?.toString() == userId)
    })
    data = lodash.orderBy(data, 'date', 'desc')
  }
  return data
}


setFilterDataUser(filterDataUser)

const getContacts = user => {
  return Session.find({
    origin: null,
    $or: [{trainees: user._id}, {trainers: user._id}],
  })
    .populate('trainees')
    .populate('trainers')
    .then(sessions => {
      let allContacts = lodash(sessions)
        .map(s => [...s.trainers, ...s.trainees])
        .flatten()
        .uniqBy(user => user._id.toString())
        .value()
      allContacts = [
        ...allContacts,
        ...lodash.uniqBy(sessions, s => s.contact_name),
      ]
      return allContacts.map(contact => ({
        _id: contact._id,
        name: contact.contact_name,
      }))
    })
}

const sendMessage = (sender, destinee, contents) => {
  console.log(`Received $${sender}, ${destinee}, ${contents}`)
  return getModel(destinee).then(model => {
    let data = {sender: sender._id, contents: contents}
    if (model == 'session') {
      data.destinee_session = destinee
    }
    else if (model == 'user') {
      data.destinee_user = destinee
    }
    return Message.create({sender: sender._id, ...data})
  })
}

const getResourceSpentTime = async(user, queryParams, resource) => {
  resource = typeof resource == 'string' ? resource : resource._id
  const key = `${user?.id}/${JSON.stringify(
    queryParams,
  )}/${resource.toString()}/spent`
  if (myCache.has(key)) {
    return myCache.get(key)
  }
  const data = await UserSessionData.findOne({user: user._id})
  const spent = data?.spent_times?.find(
    sp => sp.resource._id.toString() == resource.toString(),
  )
  const res = spent?.spent_time || 0
  myCache.set(key, res)
  return res
}

const isResourceFinished = async(user, queryParams, resource) => {
  resource = typeof resource == 'string' ? resource : resource._id
  const finished = await UserSessionData.exists({
    user: user._id,
    finished: resource,
  })
  return finished
}

const isResourceCurrent = async(user, queryParams, resource) => {
  const finished = await isResourceFinished(user, queryParams, resource)
  if (finished) {
    return false
  }
  const current = (await getResourceSpentTime(user, queryParams, resource)) > 0
  return current
}

/** Not finished, not in progress:
+  Parent theme ordered:
+   - first in theme: 'available'
+   - next of 'finished' one : 'available'
+   - else 'to come'
+  Parent theme unordered: available
+  */
const getResourceStatus = async(user, queryParams, resource) => {
  resource = typeof resource == 'string' ? resource : resource._id
  const key = `${user?.id}/${JSON.stringify(queryParams)}/${resource}/status`
  if (myCache.has(key)) {
    return myCache.get(key)
  }

  if (await isResourceFinished(user, queryParams, resource)) {
    myCache.set(key, RES_FINISHED)
    return RES_FINISHED
  }
  if ((await isResourceCurrent(user, queryParams, resource)) > 0) {
    myCache.set(key, RES_CURRENT)
    return RES_CURRENT
  }
  // Ordered theme or not ?
  const theme = await Theme.findOne({
    resources: resource,
  })
  if (!theme.ordered) {
    myCache.set(key, RES_AVAILABLE)
    return RES_AVAILABLE
  }
  const themeStatus = await getThemeStatus(user, queryParams, theme)
  if (themeStatus == RES_TO_COME) {
    myCache.set(key, RES_TO_COME)
    return RES_TO_COME
  }
  // Theme status must be available or current
  // First resource: available
  const resIndex = theme.resources.findIndex(
    r => r._id.toString() == resource.toString(),
  )
  if (resIndex == 0) {
    myCache.set(key, RES_AVAILABLE)
    return RES_AVAILABLE
  }
  const prevResource = theme.resources[resIndex - 1]
  const prevStatus = await getResourceStatus(user, queryParams, prevResource)
  if (prevStatus == RES_FINISHED) {
    myCache.set(key, RES_AVAILABLE)
    return RES_AVAILABLE
  }
  myCache.set(key, RES_TO_COME)
  return RES_TO_COME
}

const isThemeCurrent = async(user, queryParams, theme) => {
  theme = typeof theme == 'string' ? theme : theme._id
  const th = await Theme.findById(theme)
  const isCurrent = await Promise.all(
    th.resources.map(r => isResourceCurrent(user, queryParams, r)),
  )
  return isCurrent.some(v => !!v)
}

const isThemeFinished = async(user, queryParams, theme) => {
  theme = typeof theme == 'string' ? theme : theme._id
  const th = await Theme.findById(theme)
  if (!th) {
    console.trace(`No theme for ${theme}`)
  }
  const finishedStatus = await Promise.all(
    th.resources.map(r => isResourceFinished(user, queryParams, r)),
  )
  const themeFinished = finishedStatus.every(v => !!v)
  return themeFinished
}

const getThemeStatus = async(user, queryParams, theme) => {
  try {
    theme = typeof theme == 'string' ? theme : theme._id
    const key = `${user?.id}/${JSON.stringify(queryParams)}/${theme}/status`
    if (myCache.has(key)) {
      return myCache.get(key)
    }
    if (await isThemeCurrent(user, queryParams, theme)) {
      myCache.set(key, RES_CURRENT)
      return RES_CURRENT
    }
    if (await isThemeFinished(user, queryParams, theme)) {
      myCache.set(key, RES_FINISHED)
      return RES_FINISHED
    }
    // Handle availability depending on session ordered/unordered
    const session = await Session.findOne({
      themes: theme,
    })
    if (!session) {
      return null
    }
    if (!session.ordered) {
      myCache.set(key, RES_AVAILABLE)
      return RES_AVAILABLE
    }
    // First theme: available
    const prevTheme = await getPrevTheme(theme)
    if (!prevTheme) {
      myCache.set(key, RES_AVAILABLE)
      return RES_AVAILABLE
    }
    if (await isThemeFinished(user, queryParams, prevTheme)) {
      myCache.set(key, RES_AVAILABLE)
      return RES_AVAILABLE
    }
    myCache.set(key, RES_TO_COME)
    return RES_TO_COME
  }
  catch (err) {
    console.error(err)
  }
}

const getResourceAnnotation = async(user, queryParams, resource) => {
  resource = typeof resource == 'string' ? resource : resource._id
  const userData = await UserSessionData.findOne(
    {
      user: user._id,
      'annotations.resource': resource,
    },
    {
      annotations: 1,
    },
  )
  return (
    userData?.annotations.find(
      a => a.resource.toString() == resource.toString(),
    ).annotation || ''
  )
}

const getResourceSpentTimeStr = async(user, queryParams, resource) => {
  const res = await getResourceSpentTime(user, queryParams, resource)
  const str = formatTime(res)
  return str
}

const getThemeSpentTime = async(user, queryParams, theme) => {
  theme = typeof theme == 'string' ? theme : theme._id
  const key = `${user?.id}/${JSON.stringify(queryParams)}/${theme}/spent`
  if (myCache.has(key)) {
    return myCache.get(key)
  }
  const data = await Theme.findById(theme)
  const results = await Promise.all(
    data.resources.map(r => getResourceSpentTime(user, queryParams, r)),
  )
  const spent = lodash.sum(results)
  myCache.set(key, spent)
  return spent
}

const getThemeSpentTimeStr = async(user, queryParams, theme) => {
  const res = await getThemeSpentTime(user, queryParams, theme)
  return formatTime(res)
}

const getSessionSpentTime = async(user, queryParams, session) => {
  session = typeof session == 'string' ? session : session._id
  const key = `${user?.id}/${JSON.stringify(queryParams)}/${session}/spent`
  if (myCache.has(key)) {
    return myCache.get(key)
  }
  const data = await Session.findById(session)
  if (!data) {
    return 0
  }
  const results = await Promise.all(
    data.themes.map(t => getThemeSpentTime(user, queryParams, t._id)),
  )
  const spent = lodash.sum(results)
  myCache.set(key, spent)
  return spent
}

const getSessionSpentTimeStr = async(user, queryParams, session) => {
  const res = await getSessionSpentTime(user, queryParams, session)
  return formatTime(res)
}

const getThemeProgress = async(user, queryParams, theme) => {
  theme = typeof theme == 'string' ? theme : theme._id
  const key = `${user?.id}/${JSON.stringify(queryParams)}/${theme}/progress`
  if (myCache.has(key)) {
    return myCache.get(key)
  }
  const th = await Theme.findById(theme)
  if (!th) {
    console.error(`No theme for ${theme}`)
  }
  const userData = await UserSessionData.findOne({
    user: user._id,
  })
  const finishedResources = th.resources.filter(r =>
    userData?.finished?.includes(r._id),
  )
  const progress = {
    finished: finishedResources.length,
    total: th.resources.length,
  }
  myCache.set(key, progress)
  return progress
}

const getThemeProgressStr = async(user, queryParams, theme) => {
  const progress = await getThemeProgress(user, queryParams, theme)
  return `${progress.finished}/${progress.total}`
}

const getThemeProgressPercent = async(user, queryParams, theme) => {
  const progress = await getThemeProgress(user, queryParams, theme)
  return ((progress.finished * 1.0) / progress.total) * 100
}

const getSessionProgress = async(user, queryParams, session) => {
  session = typeof session == 'string' ? session : session._id
  const key = `${user?.id}/${JSON.stringify(queryParams)}/${session}/progress`
  if (myCache.has(key)) {
    return myCache.get(key)
  }
  const sess = await Session.findById(session).populate('themes')
  let progress = {
    finished: 0,
    total: 0,
  }
  if (sess) {
    const userData = await UserSessionData.findOne({
      user: user._id,
    })
    const resources = lodash.flatten(sess.themes.map(t => t.resources))
    const finishedResources = resources.filter(r =>
      userData?.finished?.includes(r._id),
    )
    progress = {
      finished: finishedResources.length,
      total: resources.length,
    }
  }
  myCache.set(key, progress)
  return progress
}

const getSessionProgressStr = async(user, queryParams, session) => {
  const progress = await getSessionProgress(user, queryParams, session)
  return `${progress.finished}/${progress.total}`
}

const getSessionProgressPercent = async(user, queryParams, session) => {
  const progress = await getSessionProgress(user, queryParams, session)
  return ((progress.finished * 1.0) / progress.total) * 100
}

const setResourceAnnotation = ({model, parent, attribute, value, user}) => {
  return UserSessionData.findOneAndUpdate(
    {
      user: user._id,
    },
    {
      user: user._id,
    },
    {
      upsert: true,
      new: true,
    },
  ).then(data => {
    const annotation = data?.annotations?.find(
      a => a.resource._id.toString() == parent.toString(),
    )
    if (annotation) {
      annotation.annotation = value
    }
    else {
      data.annotations.push({
        resource: parent,
        annotation: value,
      })
    }
    return data.save()
  })
}

declareComputedField('resource', 'spent_time_str', getResourceSpentTimeStr)
declareComputedField('resource', 'status', getResourceStatus)
declareComputedField('resource', 'annotation', getResourceAnnotation)

declareComputedField('theme', 'spent_time_str', getThemeSpentTimeStr)
declareComputedField('theme', 'progress_str', getThemeProgressStr)
declareComputedField('theme', 'progress_percent', getThemeProgressPercent)
declareComputedField('theme', 'status', getThemeStatus)

declareComputedField('session', 'spent_time_str', getSessionSpentTimeStr)
declareComputedField('session', 'progress_str', getSessionProgressStr)
declareComputedField('session', 'progress_percent', getSessionProgressPercent)

const preprocessGet = ({model, fields, id, user}) => {
  if (model == 'contact') {
    return getContacts(user, id)
      .then(res => {
        return Promise.resolve({data: res})
      })
  }

  if (model == 'session') {
    fields = lodash([...fields, 'trainers', 'trainees']).uniq().value()
  }

  if (model == 'message') {
    fields = lodash([...fields, 'sender', 'destinee_user', 'destinee_session']).uniq().value()
  }

  if (model == 'resource') {
    fields = lodash([...fields, 'version']).uniq().value()
  }

  const queryModel = model == 'loggedUser' ? 'user' : model
  const queryId = model == 'loggedUser' ? user?._id || 'INVALIDID' : id

  return Promise.resolve({model: queryModel, fields, id: queryId})
}

setPreprocessGet(preprocessGet)

declareVirtualField({model: 'user', field: 'contact_name', instance: 'String', requires: 'name,firstname,role'})
declareVirtualField({model: 'user', field: 'contact_name', instance: 'String', requires: 'name,firstname,role'})
declareVirtualField({model: 'loggedUser', field: 'contact_name', instance: 'String', requires: 'name,firstname,role'})
declareVirtualField({model: 'loggedUser', field: 'contact_name', instance: 'String', requires: 'name,firstname,role'})

declareVirtualField({model: 'contact', field: 'name', instance: 'String', requires: ''})
declareVirtualField({model: 'message', field: 'destinee_name', instance: 'String', requires: 'destinee_session.trainers,destinee_session.trainees,destinee_user'})
declareVirtualField({model: 'message', field: 'sender_name', instance: 'String', requires: 'sender'})

declareVirtualField({model: 'session', field: 'trainees_count', instance: 'Number', requires: 'trainees'})
declareVirtualField({model: 'session', field: 'trainers_count', instance: 'Number', requires: 'trainers'})
declareVirtualField({model: 'session', field: 'contact_name', instance: 'String', requires: 'name'})
declareVirtualField({model: 'session', field: 'spent_time_str', instance: 'String', requires: 'themes'})
declareVirtualField({model: 'session', field: 'progress_str', instance: 'String', requires: 'name'}) // TODO: name required ???
declareVirtualField({model: 'session', field: 'progress_percent', instance: 'Number', requires: 'name'}) // TODO: name required ???

declareVirtualField({model: 'theme', field: 'spent_time_str', instance: 'String', requires: 'resources'})
declareVirtualField({model: 'theme', field: 'progress_str', instance: 'String', requires: 'name'}) // TODO: name required ???
declareVirtualField({model: 'theme', field: 'progress_percent', instance: 'Number', requires: 'name'}) // TODO: name required ???
declareVirtualField({model: 'theme', field: 'hidden', instance: 'Boolean', requires: 'name,code,picture'}) // TODO: name required ???
declareVirtualField({model: 'theme', field: 'status', instance: 'String', requires: 'resources', enumValues: STATUS}) // TODO: name required ???

declareVirtualField({model: 'resource', field: 'spent_time_str', instance: 'String', requires: ''}) // TODO: name required ???
declareVirtualField({model: 'resource', field: 'status', instance: 'String', requires: 'finished', enumValues: STATUS}) // TODO: name required ???
declareVirtualField({model: 'resource', field: 'annotation', instance: 'String', requires: ''}) // TODO: name required ???

module.exports = {
  addChild,
  removeChildFromParent,
  moveChildInParent,
  getNext,
  getPrevious,
  getSession,
  putAttribute,
  filterDataUser,
  getContacts,
  sendMessage,
  getResourceStatus,
  getThemeStatus,
  myCache,
  setResourceAnnotation,
  getResourceAnnotation,
}
