const jwt = require('jsonwebtoken')
const {ADMIN, MANAGER, EMPLOYEE} = require('../../utils/consts')
const keys = require('../config/keys');

const get_token = req => {
  const auth = req.headers.authorization
  if (!auth) {
    console.log(`No authorization header, got ${Object.keys(req.headers)}`)
    return null
  }
  const data=auth.split(' ')[1]
  const decoded = jwt.decode(data)
  return decoded
}

const get_logged_id = req => {
  const token = get_token(req)
  if (token) {
    return token.id
  }
  return null
}

const getRole = req => {
  const token = get_token(req)
  if (token) {
    return token.role
  }
  return null
}

const isB2BAdmin = req => {
  return ADMIN == getRole(req)
}

const isB2BManager = req => {
  return MANAGER == getRole(req)
}

const isB2BEmployee = req => {
  return EMPLOYEE == getRole(req)
}

const isModeCompany = req => {
  return isB2BAdmin(req) || isB2BManager(req)
}

//Create JWT cookie with user credentials
const send_cookie = (user, role, res) => {
  const payload = {
    id: user.id,
    name: user.name,
    firstname: user.firstname,
    is_admin: user.is_admin,
    is_alfred: user.is_alfred,
    is_alfred_pro: user.shop && user.shop.length==1 && !user.shop[0].is_particular,
    role: role,
    is_registered: user.is_registered,
  }; // Create JWT payload

  jwt.sign(payload, keys.JWT.secretOrKey, (err, token) => {
    res.cookie('token', 'Bearer ' + token, {
      httpOnly: false,
      secure: true,
      sameSite: true,
    })
      .status('201')
      .json()
  });
};

module.exports = {get_logged_id, getRole, isB2BAdmin, isB2BManager,
  isB2BEmployee, isModeCompany, send_cookie, get_token}
