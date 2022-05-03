const lodash=require('lodash')
const {RELATED} = require('../../utils/feurst/consts')

const {USER_ACTIONS, ALL, COMPANY, MINE} = require('../../utils/consts')

const getActions = (roles, model, action) => {
  const actions=lodash.flattenDeep(roles.map(role => USER_ACTIONS[role]))
  if (!actions) {
    return []
  }
  return actions.filter(a => a.model==model && a.action==action)
}

const isActionAllowed = (roles, model, action) => {
  const actions=getActions(roles, model, action)
  const allowed=actions.length>0
  return allowed
}

const filterOrderQuotation = (data, model, user, action) => {
  const userActions=getActions(user.roles, model, action)
  if (userActions.some(userAction => userAction.visibility==ALL)) {
    return data
  }
  if (userActions.some(userAction => userAction.visibility==RELATED)) {
    return data.filter(d => user.companies.map(c => String(c._id)).includes(String(d.user.company._id)))
  }
  if (userActions.some(userAction => userAction.visibility==COMPANY)) {
    return data.filter(d => String(d.user.company._id)==String(user.company._id))
  }
  if (userActions.some(userAction => userAction.visibility==MINE)) {
    return data.filter(d => String(d.user._id)==String(user._id))
  }
  return []
}

const filterUsers = (data, model, user, action) => {
  const userActions=getActions(user.roles, model, action)
  if (userActions.some(userAction => userAction.visibility==ALL)) {
    return data
  }
  if (userActions.some(userAction => userAction.visibility==RELATED)) {
    return data.filter(d => user.companies.map(c => String(c._id)).includes(String(d.company._id)))
  }
  if (userActions.some(userAction => userAction.visibility==COMPANY)) {
    return data.filter(d => String(d.company?._id)==String(user.company?._id))
  }
  if (userActions.some(userAction => userAction.visibility==MINE)) {
    return data.filter(d => String(d._id)==String(user._id))
  }
  return []
}

const getActionsForRoles = roles => {
  let actions=lodash.flattenDeep(roles.map(role => USER_ACTIONS[role]))
  actions=lodash.uniq(actions)
  return actions
}

module.exports={isActionAllowed, filterOrderQuotation, getActionsForRoles, filterUsers}
