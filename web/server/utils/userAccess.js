const lodash=require('lodash')

const {USER_ACTIONS, ALL} = require('../../utils/consts')

const getActions = (role, model, action) => {
  const actions=lodash.flattenDeep(roles.map(role => USER_ACTIONS[role]))
  if (!actions) {
    return []
  }
  return userActions.filter(userAction => userAction.model==model && userAction.action==action)
}

const isActionAllowed = (roles, model, action) => {
  return getActions(roles, model, action).length>0
}

const getDataFilter = (roles, model, action) => {
  const userActions=getActions(roles, model, action)
  if (userActions.some(userAction => userAction.visibility==ALL)) {
    return {}
  }
  if (userActions.some(userAction => userAction.visibility==COMPANY)) {
    return {company: req.user.company._id}
  }
  if (userActions.some(userAction => userAction.visibility==MINE)) {
    return {user: re.user._id}
  }
  return {noway: true}
}

const getActionForRoles = roles => {
  let actions=lodash.flattenDeep(roles.map(role => USER_ACTIONS[role]))
  actions=lodash.uniq(actions)
  return actions
}

module.exports={isActionAllowed, getDataFilter, getActionForRoles}
