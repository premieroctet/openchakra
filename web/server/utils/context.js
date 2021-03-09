const jwt = require('jsonwebtoken')
const {ADMIN} = require('../../utils/consts')

const get_role = req => {
  const auth = req.headers.authorization
  console.log(req.headers)
  if (!auth) {
    return null
  }
  const data=auth.split(' ')[1]
  const decoded = jwt.decode(data);
  console.log(`Decode token:${decoded}`)
  return decoded.role
}

const is_b2b_admin = req => {
  return ADMIN == get_role(req)
}

module.exports = {get_role, is_b2b_admin}
