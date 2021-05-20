import {isWinPhone, isAndroid, isIOS, getUA} from 'react-device-detect';


const isWebview = require('is-webview');
const {getAuthToken} = require('./authentication')
const {ADMIN, MANAGER, EMPLOYEE} = require('./consts')
const {getLoggedUser}=require('./functions')


const is_b2b_site = () => {
  if (typeof localStorage == 'undefined') {
    return false
  }
  const is_b2b = localStorage.getItem('b2b') === "true"
  return is_b2b
}

const get_role = () => {
  const token = getAuthToken()
  if (!token) {
    return null
  }
  return token.role
}

const is_b2b_employee = () => {
  const is_employee = get_role()==EMPLOYEE
  return is_employee
}

const is_b2b_admin = () => {
  const is_admin = get_role()==ADMIN
  return is_admin
}

const is_b2b_manager = () => {
  const is_manager = get_role()==MANAGER
  return is_manager
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

const setStatusRegister = () =>{
  if(!getLoggedUser()){
    return localStorage.setItem('setAlfredRegister', 'true')
  }
}

const removeStatusRegister = () =>{
  return localStorage.removeItem('setAlfredRegister')
}

module.exports = {
  is_b2b_style, is_b2b_employee, is_b2b_admin, is_b2b_manager, is_b2b_site, is_mode_company, is_application, is_mobile,
  get_role,setStatusRegister,removeStatusRegister
}
