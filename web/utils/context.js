const {getAuthToken} = require('./authentication')
const {ADMIN, MANAGER} = require('./consts')

const is_b2b_site = () => {
  if (typeof localStorage == 'undefined') {
    console.log('Pas de localStorage')
    return false
  }
  const is_b2b = localStorage.getItem('b2b') === "true"
  return is_b2b
}

const is_b2b_employee = user => {
  const is_employee = user && user.is_employee
  return is_employee
}

/** User is b2b admin if all are true :
 - is not null
 - has ADMIN role
 - is logged under ADMIN role
 */

 const is_b2b_admin = user => {
  const is_admin = Boolean(user) && user.roles && user.roles.includes(ADMIN)
  if (!is_admin) {
    return false
  }

  const token=getAuthToken()
  const result = token && token.role==ADMIN
  return result
}

const is_b2b_manager = user => {
  const is_manager = Boolean(user) && user.roles && user.roles.includes(MANAGER)
  if (!is_manager) {
    return false
  }

  const token=getAuthToken()
  const result = token && token.role==MANAGER
  return result
}

const is_mode_company = user => {
  return is_b2b_admin(user)||is_b2b_manager(user)
}

const is_b2b_style = user => {
  return is_b2b_site() || is_b2b_admin(user) || is_b2b_manager(user)
}
module.exports={
  is_b2b_style, is_b2b_employee, is_b2b_admin, is_b2b_manager, is_b2b_site
}
