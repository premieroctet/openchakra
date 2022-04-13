const lodash=require('lodash')

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
  console.log(`Allowed ${[roles, model, action]} amongst ${JSON.stringify(actions)} => ${allowed}`)
  return allowed
}

const getDataFilter = (user, model, action) => {
  const userActions=getActions(user.roles, model, action)
  if (userActions.some(userAction => userAction.visibility==ALL)) {
    return {}
  }
  if (userActions.some(userAction => userAction.visibility==COMPANY)) {
    return {company: user.company}
  }
  if (userActions.some(userAction => userAction.visibility==MINE)) {
    return {user: user}
  }
  return {noway: true}
}

const getActionsForRoles = roles => {
  let actions=lodash.flattenDeep(roles.map(role => USER_ACTIONS[role]))
  actions=lodash.uniq(actions)
  return actions
}

module.exports={isActionAllowed, getDataFilter, getActionsForRoles}
