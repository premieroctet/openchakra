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

const is_b2b_admin = user => {
  return true
  const token=getAuthToken()
  console.log(`is_b2b_admin:user:${JSON.stringify(user)}`)
  console.log(`is_b2b_admin:user.roles:${JSON.stringify(user ? user.roles.includes('ADMIN') : [])}`)
  const is_admin = user && user.roles && user.roles.includes('ADMIN')
  if (!is_admin) {
    console.log(`is_b2b_admin:false`)
    return false
  }
  return token && token.roles == 'ADMIN'
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
