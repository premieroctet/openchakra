const User = require('../../models/User')
const Group = require('../../models/Group')
const {addAction} = require('../../utils/studio/actions')

const smartdiet_join_group = ({value, join}, user) => {
  return Group.findByIdAndUpdate(value, join ? {$addToSet: {users: user._id}} : {$pull: {users: user._id}})
    .then(() => Group.findById(value))
    .then(g => g._id)
}

addAction('smartdiet_join_group', smartdiet_join_group)

// skip, join or pass
const smartdiet_event = ({value, action}, user) => {
  if (!['pass', 'skip', 'join'].cinludes(action)) {
    throw new Error(`Unknown smartdiet_event action ${action}`)
  }
  const dbAction=action==
  'skip' ? {$addToSet: {skipped_events: user._id}, $pull: {registered_events: user._id, passed_events: user._id}}
  : 'pass' ? {$addToSet: {passed_events: user._id}, $pull: {registered_events: user._id, skipped_events: user._id}}
  : /** 'join'*/ {$addToSet: {registered_events: user._id}, $pull: {passed_events: user._id, skipped_events: user._id}}

  return User.findByIdAndUpdate(user._id, action)
    .then(() => User.findById(user._id))
}

addAction('smartdiet_event', smartdiet_event)
