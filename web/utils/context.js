const is_b2b_site = () => {
  if (typeof localStorage=='undefined') {
    console.log('Pas de localStorage')
    return false
  }
  const is_b2b = localStorage.getItem('b2b')=="true"
  return is_b2b
}

const is_b2b_employee = user => {
  const is_employee = user && user.is_employee
  return is_employee
}

const is_b2b_admin = user => {
  const is_admin = user && user.is_b2b_admin
  return is_b2b_admin
}

module.exports={
  is_b2b_site, is_b2b_employee, is_b2b_admin
}
