const jwt = require('jsonwebtoken')
const {ADMIN} = require('../../utils/consts')
const keys = require('../config/keys');

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

//Create JWT cookie with user credentials
const sendCookie = (user, res) => {
  const payload = {
    id: user.id,
    name: user.name,
    firstname: user.firstname,
    is_admin: user.is_admin,
    is_alfred: user.is_alfred,
    is_alfred_pro: user.shop && user.shop.length==1 && !user.shop[0].is_particular,
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

module.exports = {get_role, is_b2b_admin, sendCookie}
