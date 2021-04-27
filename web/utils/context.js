import {isWinPhone, isAndroid, isIOS, getUA} from 'react-device-detect';


const isWebview = require('is-webview');
const {getAuthToken} = require('./authentication')
const {ADMIN, MANAGER} = require('./consts')

const is_b2b_site = () => {
  if (typeof localStorage == 'undefined') {
    return false
  }
  const is_b2b = localStorage.getItem('b2b') === "true"
  return is_b2b
}

const is_b2b_employee = user => {
  const is_employee = user && user.is_employee
  return is_employee
}

/** User is b2b admin if all are true :
 - is not null
 - has ADMIN role
 - is logged under ADMIN role
 */

const is_b2b_admin = () => {
  const token = getAuthToken()
  const result = token && token.role == ADMIN
  return result
}

const is_b2b_manager = () => {
  const token = getAuthToken()
  const result = token && token.role == MANAGER
  return result
}

const is_mode_company = () => {
  return is_b2b_admin() || is_b2b_manager()
}

const is_b2b_style = () => {
  return is_b2b_site() || is_b2b_admin() || is_b2b_manager()
}

const is_application = () => {
  return isWebview(getUA)
}
const is_mobile = () => {
  return (isAndroid || isIOS || isWinPhone)
}
module.exports = {
  is_b2b_style, is_b2b_employee, is_b2b_admin, is_b2b_manager, is_b2b_site, is_mode_company, is_application, is_mobile
}
