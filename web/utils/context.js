const {isAndroid, isIOS, getUA}=require('react-device-detect')
const isWebview = require('is-webview')
const {getAuthToken} = require('./authentication')
const {ADMIN, MANAGER, EMPLOYEE} = require('./consts')
const jwt = require('jsonwebtoken')
const {HIDE_EMPTY_EVALUATIONS}=require('../mode')

const getLoggedUser = () => {
  if (typeof localStorage=='undefined') {
    return null
  }
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }
  const data=token.split(' ')[1]
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

const getRole = () => {
  const token = getAuthToken()
  if (!token) {
    return null
  }
  return token.role
}

const hideEmptyEvaluations = () => {
  return Boolean(HIDE_EMPTY_EVALUATIONS)
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
// Alred registering without invitation
const REGISTER_WITHOUT_CODE='no_code'

const setAlfredRegistering = id => {
  if(getLoggedUser() === null) {
    console.log(`Registering code ${id}`)
    return localStorage.setItem(ALFRED_REGISTERING, id || REGISTER_WITHOUT_CODE)
  }
}

const removeAlfredRegistering = () => {
  return localStorage.removeItem(ALFRED_REGISTERING)
}

const isAlfredRegistering = () => {
  return localStorage.getItem(ALFRED_REGISTERING)
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

module.exports = {
  isApplication, isMobile,
  getRole, setAlfredRegistering, removeAlfredRegistering, isAlfredRegistering,
  getLoggedUserId, getLoggedUser,
  isLoggedUserAdmin, isUserSuperAdmin, isEditableUser, isLoggedUserAlfred, isLoggedUserAlfredPro,
  isLoggedUserRegistered, isIOS, isAndroid, hideEmptyEvaluations,
  getLoggedAs, REGISTER_WITHOUT_CODE,
}
