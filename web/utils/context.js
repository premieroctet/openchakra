import {isAndroid, isIOS, getUA} from 'react-device-detect'
import {setAxiosAuthentication} from './authentication'
const isWebview = require('is-webview')
const {getAuthToken} = require('./authentication')
const {ADMIN, MANAGER, EMPLOYEE} = require('./consts')
const {isB2BDisabled} = require('../config/config')
const jwt = require('jsonwebtoken')
const {getPartnerFromHostname}=require('./partner')
const {HIDE_EMPTY_EVALUATIONS}=require('../mode')

const getLoggedUser = () => {
  if (typeof localStorage=='undefined') {
    return null
  }
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }
  const data=token.split(' ')[ 1 ]
  const decoded = jwt.decode(data)
  return decoded
}

const isLoggedUserAlfredPro = () => {
  const logged=getLoggedUser()
  return logged && logged.is_alfred_pro
}

const getLoggedAs = () => {
  const logged=getLoggedUser()
  return logged && logged.logged_as
}

const isB2BSite = () => {
  if (isB2BDisabled()) {
    return false
  }
  if (typeof localStorage == 'undefined') {
    return false
  }
  const is_b2b = localStorage.getItem('b2b') === 'true'
  return is_b2b
}

const getRole = () => {
  if (isB2BDisabled()) {
    return null
  }
  const token = getAuthToken()
  if (!token) {
    return null
  }
  return token.role
}

const isB2BEmployee = () => {
  const is_employee = getRole() == EMPLOYEE
  return is_employee
}

const isB2BAdmin = () => {
  const is_admin = getRole() == ADMIN
  return is_admin
}

const isB2BManager = () => {
  const is_manager = getRole() == MANAGER
  return is_manager
}

const isModeCompany = () => {
  return isB2BAdmin() || isB2BManager()
}

const hideEmptyEvaluations = () => {
  return Boolean(HIDE_EMPTY_EVALUATIONS)
}

const isB2BStyle = () => {
  if (isB2BDisabled()) {
    return false
  }
  // User non loggué : return isB2BSite (localStorage)
  // Loggué :
  // - b2b admin ou b2b manager : true
  // - b2b employé : false
  // - alfred pro : return isB2BSite (localStorage)
  // - sans rôle : false
  if (!getLoggedUser()) {
    return isB2BSite()
  }
  if (isB2BAdmin() || isB2BManager()) {
    return true
  }
  if (isB2BEmployee()) {
    return false
  }
  if (isLoggedUserAlfredPro()) {
    return isB2BSite()
  }
  return false
}

const isApplication = () => {
  const _ua = getUA.toLocaleLowerCase()
  const safari = /safari/.test(_ua)
  const ios = /iphone|ipod|ipad/.test(_ua)
  let is_ios_app = false
  if (ios && !safari) {
    is_ios_app = true
  }
  return is_ios_app || isWebview(getUA)
}

const isMobile = () => {
  return (isAndroid || isIOS)
}

const ALFRED_REGISTERING = 'alfredRegistring'

const setAlfredRegistering = () => {
  if(getLoggedUser() === null) {
    return localStorage.setItem(ALFRED_REGISTERING, 'true')
  }
}

const removeAlfredRegistering = () => {
  return localStorage.removeItem(ALFRED_REGISTERING)
}

const isAlfredRegistering = () => {
  return localStorage.getItem(ALFRED_REGISTERING) == 'true'
}

const getLoggedUserId = () => {
  const logged=getLoggedUser()
  return logged && logged.id
}

const isLoggedUserAdmin = () => {
  const logged=getLoggedUser()
  return logged && logged.is_admin
}

const isUserSuperAdmin = user => {
  return user && user.is_admin && user.email.match(/@my-alfred\.io$/)
}

const isLoggedUserAlfred = () => {
  const logged=getLoggedUser()
  return logged && logged.is_alfred
}

const isLoggedUserRegistered = () => {
  const logged=getLoggedUser()
  const result=logged && logged.is_registered
  console.log(`Registered:${result}`)
  return result
}

// Returns true if user is the currently logged user
const isEditableUser = user => {
  if (!user || !getLoggedUserId()) {
    return false
  }
  const isEditable=getLoggedUserId()==user || getLoggedUserId()==user._id
  return isEditable
}

const getPartner = () => {
  return getPartnerFromHostname(window.location.hostname)
}

module.exports = {
  isB2BStyle, isB2BEmployee, isB2BAdmin, isB2BManager, isModeCompany, isApplication, isMobile,
  getRole, setAlfredRegistering, removeAlfredRegistering, isAlfredRegistering,
  getLoggedUserId, getLoggedUser,
  isLoggedUserAdmin, isUserSuperAdmin, isEditableUser, isLoggedUserAlfred, isLoggedUserAlfredPro,
  isLoggedUserRegistered, isIOS, isAndroid, getPartner, hideEmptyEvaluations,
  getLoggedAs,
}
