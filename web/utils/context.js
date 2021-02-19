const {getAuthToken} = require('./authentication')

const is_b2b_site = () => {
  return true
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
  /**
  const is_admin = Boolean(user) && user.roles && user.roles.includes('ADMIN')
  if (!is_admin) {
    console.debug(`Not B2B admin : user:${Boolean(user)}, roles:${user ? user.roles : ''}`)
    return false
  }
  */
  const token=getAuthToken()
  const result = token && token.role=='ADMIN'
  if (!result) {
    console.debug(`Not B2B admin : role:${token ? token.role : 'no token'}`)
  }
  return result
}

const is_b2b_buyer = user => {
  /**
  const is_admin = Boolean(user) && user.roles && user.roles.includes('BUYER')
  if (!is_admin) {
    console.debug(`Not B2B buyer : user:${Boolean(user)}, roles:${user ? user.roles : ''}`)
    return false
  }
  */
  const token=getAuthToken()
  const result = token && token.role=='BUYER'
  if (!result) {
    console.debug(`Not B2B buyer : role:${token ? token.role : 'no token'}`)
  }
  return result
}

const is_mode_company = user => {
  /**
  const _is_company = user && user.is_company
  return true //is_mode_company
  */
  return is_b2b_admin(user)
}

const is_b2b_style = (user) => {
  return is_b2b_site() || is_b2b_admin() || is_b2b_buyer()
}
module.exports={
  is_b2b_style, is_b2b_employee, is_b2b_admin, is_b2b_site
}
