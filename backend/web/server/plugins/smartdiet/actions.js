const Group = require('../../models/Group')
const {addAction} = require('../../utils/studio/actions')

const smartdiet_join_group = ({value, join}, user) => {
  return Group.findByIdAndUpdate(value, join ? {$addToSet: {users: user._id}} : {$pull: {users: user._id}})
    .then(() => Group.findById(value))
}

addAction('smartdiet_join_group', smartdiet_join_group)
