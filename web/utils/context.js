import {isAndroid, isIOS, getUA} from 'react-device-detect';
const {getLoggedUser, isLoggedUserAdmin, isEditableUser, isLoggedUserAlfred, isLoggedUserAlfredPro}=require('./functions')
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
  const is_employee = get_role() == EMPLOYEE
  return is_employee
}

const is_b2b_admin = () => {
  const is_admin = get_role() == ADMIN
  return is_admin
}

const is_b2b_manager = () => {
  const is_manager = get_role() == MANAGER
  return is_manager
}

const is_mode_company = () => {
  return is_b2b_admin() || is_b2b_manager()
}

const is_b2b_style = () => {
  // User non loggué : return is_b2b_site (localStorage)
  // Loggué :
  // - b2b admin ou b2b manager : true
  // - b2b employé : false
  // - alfred pro : return is_b2b_site (localStorage)
  // - sans rôle : false
  if (!getLoggedUser()) {
    return is_b2b_site()
  }
  if (is_b2b_admin() || is_b2b_manager()) {
      return true
  }
  if (is_b2b_employee()) {
    return false
  }
  if (isLoggedUserAlfredPro()) {
    return is_b2b_site()
  }
  return false
}

const is_application = () => {
  const _ua = getUA.toLocaleLowerCase();
  const safari = /safari/.test(_ua);
  const ios = /iphone|ipod|ipad/.test(_ua);
  let is_ios_app = false;
  if (ios && !safari) {
    is_ios_app = true;
  }
  return is_ios_app || isWebview(getUA);
}

const is_mobile = () => {
  return (isAndroid || isIOS)
}

const setStatusRegister = () =>{
  if(getLoggedUser() === null){
    return localStorage.setItem('setAlfredRegister', 'true')
  }
}

const removeStatusRegister = () =>{
  return localStorage.removeItem('setAlfredRegister')
}

module.exports = {
  is_b2b_style, is_b2b_employee, is_b2b_admin, is_b2b_manager, is_mode_company, is_application, is_mobile,
  get_role,setStatusRegister,removeStatusRegister
}
