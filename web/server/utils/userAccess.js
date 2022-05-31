const lodash=require('lodash')
const {
  COMPLETE,
  CREATED,
  CUSTOMER_ADMIN,
  HANDLE,
  QUOTATION,
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
  const userActions=getActions(user.roles, model, action)
  let models=[]
  if (userActions.some(userAction => userAction.visibility==ALL)) {
    models=data
  }
  else if (userActions.some(userAction => userAction.visibility==RELATED)) {
    models=data.filter(d => user.companies.map(c => String(c._id)).includes(String(d.company._id)))
  }
  else if (userActions.some(userAction => userAction.visibility==COMPANY)) {
    models=data.filter(d => String(d.company._id)==String(user.company?._id))
  }
  // Only display quotations created by my company
  models=models.filter(m => (model==QUOTATION && [CREATED, COMPLETE].includes(m.status) ? String(m.created_by_company?._id)==String(user.company?._id) : true))
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

const getStatusLabel = (data, model, user) => {
  const isCustomer = !isFeurstUser(user)
  const canHandle = isActionAllowed(user.roles, model, HANDLE)
  const LABELS = {
    QUOTATION: {
      CREATED: () => 'En cours de création',
      COMPLETE: () => 'En cours de création',
      VALID: () => isCustomer && `${data.sales_representative.firstname} traite votre demande` || 'Nouvelle demande à traiter',
      HANDLED: () => isCustomer && `${data.sales_representative.firstname} a traité votre demande. Expiration le ${data.expiration_date ? data.expiration_date.format('L') : 'inconnue'}`
        || `Devis envoyé au client. Expiration le ${data.expiration_date ? data.expiration_date.format('L') : 'inconnue'}`,
      CONVERTED: () => `Commande effectuée`,
      EXPIRED: () => `Proposition expirée`,
    },
    ORDER: {
      CREATED: () => 'En cours de création',
      COMPLETE: () => 'En cours de création',
      VALID: () => (isCustomer ? 'Feurst traite votre commande' : canHandle ? 'Nouvelle commande à traiter' : 'En cours de traitement par ADV'),
      HANDLED: () => (isCustomer ? 'Feurst a traité votre commande' : canHandle ? 'Commande traitée' : 'Traitée par ADV'),
      PARTIALLY_HANDLED: () => (isCustomer ? 'Votre commande est partiellemennt traitée' : canHandle ? 'Commande partiellement traitée' : 'Partiellement traitée par ADV'),
    },
  }
  const label=LABELS[model][data.status]()
  if (!label) {
    console.error(`Label not found for roles ${user.roles}, datatype ${model}, status ${data.status}`)
  }
  return label || ''
}

module.exports={isActionAllowed, filterOrderQuotation, getActionsForRoles,
  filterUsers, filterCompanies, isFeurstUser, getStatusLabel}
