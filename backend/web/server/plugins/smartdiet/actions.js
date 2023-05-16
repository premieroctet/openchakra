const { idEqual, loadFromDb } = require('../../utils/database')
const { addAction, setAllowActionFn, ACTIONS } = require('../../utils/studio/actions')
const User = require('../../models/User')
const Group = require('../../models/Group')
const Company = require('../../models/Company')
const {PARTICULAR_COMPANY_NAME}=require('./consts')

const smartdiet_join_group = ({value, join}, user) => {
  return Group.findByIdAndUpdate(value, join ? {$addToSet: {users: user._id}} : {$pull: {users: user._id}})
    .then(() => Group.findById(value))
    .then(g => g._id)
}

addAction('smartdiet_join_group', smartdiet_join_group)

// skip, join or pass
const smartdiet_event = action => ({value}, user) => {
  console.log(`Event action ${JSON.stringify(action)} on ${value}`)
  const dbAction=action==
  'smartdiet_skip_event' ? {$addToSet: {skipped_events: value}, $pull: {registered_events: value, passed_events: value}}
  : action=='smartdiet_pass_event' ? {$addToSet: {passed_events: value}, $pull: {registered_events: value, skipped_events: value}}
  : action=='smartdiet_join_event' ? {$addToSet: {registered_events: value}, $pull: {passed_events: value, skipped_events: value}}
  :  null

  if (!dbAction) {
    throw new Error(`Event subaction ${JSON.stringify(action)} unknown`)
  }

  return User.findByIdAndUpdate(user._id, dbAction)
    .then(() => User.findById(user._id))
}

['smartdiet_join_event','smartdiet_skip_event','smartdiet_pass_event','smartdiet_start_event'].forEach(action => {
  addAction(action, smartdiet_event(action))
})

const defaultRegister=ACTIONS.register

const register=props => {
  // No compay => set the particular one
  if (!props.company) {
    return Company.findOne({name: PARTICULAR_COMPANY_NAME})
      .then(partCompany => defaultRegister({...props, company: partCompany._id}))
  }
  return defaultRegister(props)
}

addAction('register', register)

const isActionAllowed = ({action, dataId, user}) => {
  if (action=='smartdiet_join_event') {
    return loadFromDb({model: 'user', id:user._id, fields:['skipped_events', 'registered_events','webinars'], user})
      .then(([user]) => {
        if (user?.skipped_events?.some(r => idEqual(r._id, dataId))) { return false}
        if (user?.registered_events?.some(r => idEqual(r._id, dataId))) { return false}
        if (!user?.webinars?.some(r => idEqual(r._id, dataId))) { return false}
        return true
      })
  }
  if (action=='smartdiet_skip_event') {
    return loadFromDb({model: 'user', id:user._id, fields:['skipped_events', 'registered_events','webinars'], user})
      .then(([user]) => {
        if (user?.skipped_events?.some(r => idEqual(r._id, dataId))) { return false}
        if (user?.registered_events?.some(r => idEqual(r._id, dataId))) { return false}
        if (!user?.webinars?.some(r => idEqual(r._id, dataId))) { return false}
        return true
      })
  }
  if (action=='smartdiet_start_event') {
    return loadFromDb({model: 'user', id:user._id, fields:['registered_events'], user})
      .then(([user]) => user?.registered_events?.some(r => idEqual(r._id, dataId)))
  }

  return Promise.resolve(true)
}

setAllowActionFn(isActionAllowed)
