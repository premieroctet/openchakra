const {getAuthToken} = require('./authentication')

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
  const is_admin = Boolean(user) && user.roles && user.roles.includes('ADMIN')
  if (!is_admin) {
    return false
  }
  const token=getAuthToken()
  return token && token.role=='ADMIN'
}

const is_mode_company = user => {
  /**
  const _is_company = user && user.is_company
  return true //is_mode_company
  */
  return is_b2b_admin(user)
}

module.exports={
  is_b2b_site, is_b2b_employee, is_b2b_admin
}
