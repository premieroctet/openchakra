const User=require('../models/User')
const jwt = require('jsonwebtoken')
const {ADMIN, MANAGER, EMPLOYEE} = require('../../utils/consts')
const keys = require('../config/keys')
const {is_development, is_validation} = require('../../config/config')
const {getPartnerFromHostname}=require('../../utils/partner')

const get_token = req => {
  const auth = req.headers.authorization
  if (!auth) {
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

// Create JWT cookie with user credentials
const send_cookie = (user, role, res, logged_as=null) => {
  const payload = {
    id: user.id,
    name: user.name,
    firstname: user.firstname,
    is_admin: user.is_admin,
    is_alfred: user.is_alfred,
    is_alfred_pro: user.shop && user.shop.length==1 && !user.shop[0].is_particular,
    role: role,
    is_registered: user.is_registered,
    logged_as: logged_as,
  } // Create JWT payload

  jwt.sign(payload, keys.JWT.secretOrKey, (err, token) => {
    if (err) {
      return console.error(`Token signing error:${err}`)
    }
    res.cookie('token', `Bearer ${token}`, {
      httpOnly: false,
      secure: true,
      sameSite: true,
    }).status('201').json()
  })
}

class PartnerServerContext {
  constructor(partner) {
    this.partner=partner
    this.connection=null
  }

}

class RequestServerContext extends PartnerServerContext {
  constructor(request) {
    super(RequestServerContext.getPartner(request))
    this.request=request
    this.user=null
    const user_id=get_logged_id(request)
    if (user_id) {
      User.findById(user_id)
        .then(user => {
          this.user=user
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  static getPartner = request => {
    const host=request.hostname
    return getPartnerFromHostname(host)
  }

  getUser = () => {
    return this.user
  }

  isAdmin = () => {
    return get_token(this.request) && get_token(this.request).is_admin
  }

  getLoggedAs = () => {
    const token=get_token(this.request)
    return token && token.logged_as
  }

}


const serverContextFromRequest = req => {
  return new RequestServerContext(req)
}

module.exports = {get_logged_id, getRole, isB2BAdmin, isB2BManager,
  isB2BEmployee, isModeCompany, send_cookie, get_token, serverContextFromRequest,
}
