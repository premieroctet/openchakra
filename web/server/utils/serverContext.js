const jwt = require('jsonwebtoken')
const {ADMIN, MANAGER, EMPLOYEE} = require('../../utils/consts')
const keys = require('../config/keys')
const {is_development, is_validation} = require('../../config/config')
const {connectionPool}=require('./database')

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

class ServerContext {
  constructor(request) {
    this.request=request
    this.connection=null
    this.user=null
    const models='User Album Availability Billing Booking Calculating Calendar Category ChatRoom Company Count Equipment Favori FilterPresentation Group Job Message Newsletter Option Prestation Prospect ResetToken Review SearchFilter Service ServiceUser ShopBanner Shop Tag User'.split(' ')
    models.forEach(m => {
      this.getModel(m)
    })
    const user_id=get_logged_id(this.request)
    if (user_id) {
      this.getModel('User').findById(user_id)
        .then(user => {
          this.user=user
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  getPartner = () => {
    const host=this.request.hostname
    if (['my-alfred.io', 'my-alfred.io', 'alfred-business.com', 'localhost', 'sebhd.freeboxos.fr'].includes(host)) {
      return null
    }
    const subdomain=host.split('.')[0]
    if (subdomain=='www') {
      return null
    }
    return subdomain
  }

  getDbName = () => {
    const partner=this.getPartner()
    if (partner) {
      return partner
    }
    if (is_development() || is_validation()) {
      return 'test-myAlfred-V2'
    }
    return 'test-myAlfred'
  }

  getUser = () => {
    return this.user
  }

  getConnection() {
    if (!this.connection) {
      this.connection=connectionPool.getConnection(this.getDbName())
    }
    return this.connection
  }

  getModel = modelName => {
    if (this.getConnection().modelNames().includes(modelName)) {
      return this.getConnection().models[modelName]
    }
    /* eslint-disable global-require */
    const schema=require(`../models/${modelName}`)
    /* eslint-enable global-require */
    const model=this.getConnection().model(modelName, schema)
    return model
  }

  isAdmin = () => {
    return get_token(this.request) && get_token(this.request).is_admin
  }

}

module.exports = {get_logged_id, getRole, isB2BAdmin, isB2BManager,
  isB2BEmployee, isModeCompany, send_cookie, get_token, ServerContext}
