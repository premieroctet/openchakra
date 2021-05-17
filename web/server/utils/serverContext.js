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

const get_role = req => {
  const token = get_token(req)
  if (token) {
    return token.role
  }
  return null
}

const is_b2b_admin = req => {
  return ADMIN == get_role(req)
}

const is_b2b_manager = req => {
  return MANAGER == get_role(req)
}

const is_b2b_employee = req => {
  return EMPLOYEE == get_role(req)
}

const is_mode_company = req => {
  return is_b2b_admin(req) || is_b2b_manager(req)
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

module.exports = {get_logged_id, get_role, is_b2b_admin, is_b2b_manager,
  is_b2b_employee, is_mode_company, send_cookie, get_token}
