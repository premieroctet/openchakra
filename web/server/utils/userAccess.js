const lodash=require('lodash')
const {
  COMPLETE,
  CREATED,
  CUSTOMER_ADMIN,
  RELATED,
} = require('../../utils/feurst/consts')

const {USER_ACTIONS, ALL, COMPANY} = require('../../utils/consts')

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
  console.log('filter commands')
  const userActions=getActions(user.roles, model, action)
  let models=[]
  if (userActions.some(userAction => userAction.visibility==ALL)) {
    models=data
  }
  else if (userActions.some(userAction => userAction.visibility==RELATED)) {
    models=data.filter(d => user.companies.map(c => String(c._id)).includes(String(d.company._id)))
  }
  else if (userActions.some(userAction => userAction.visibility==COMPANY)) {
    console.log('filter commands company')
    console.log(user.company._id, data.map(d => d.status))
    models=data.filter(d => String(d.company._id)==String(user.company?._id))
  }
  // In progress : only display created by my company
  console.log(`Returning ${models.length} models`)
  models=models.filter(m => ([CREATED, COMPLETE].includes(m.status) ? String(m.created_by_company?._id)==String(user.company?._id) : true))
  console.log(`Returning ${models.length} models`)
  return models
}

const filterUsers = (data, model, user, action) => {
  const userActions=getActions(user.roles, model, action)
  if (userActions.some(userAction => userAction.visibility==ALL)) {
    return data
  }
  if (userActions.some(userAction => userAction.visibility==RELATED)) {
    return data.filter(u => !!u.company && u.roles.includes(CUSTOMER_ADMIN) && user.companies.map(c => String(c._id)).includes(String(u.company._id)))
  }
  if (userActions.some(userAction => userAction.visibility==COMPANY)) {
    return data.filter(d => String(d.company?._id)==String(user.company?._id))
  }
  return []
}

const filterCompanies = (data, model, user, action) => {
  const userActions=getActions(user.roles, model, action)
  if (userActions.some(userAction => userAction.visibility==ALL)) {
    return data
  }
  if (userActions.some(userAction => userAction.visibility==RELATED)) {
    return data.filter(c => user.companies.map(c => String(c._id)).includes(String(c._id)))
  }
  if (userActions.some(userAction => userAction.visibility==COMPANY)) {
    return data.filter(c => String(c._id)==String(user.company?._id))
  }
  return []
}

const getActionsForRoles = roles => {
  let actions=lodash.flattenDeep(roles.map(role => USER_ACTIONS[role]))
  actions=lodash.uniq(actions)
  return actions
}

isFeurstUser = user => {
  return !user.company
}

module.exports={isActionAllowed, filterOrderQuotation, getActionsForRoles,
  filterUsers, filterCompanies, isFeurstUser}
