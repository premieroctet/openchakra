import {isAndroid, isIOS, getUA} from 'react-device-detect';
const isWebview = require('is-webview');
const {getAuthToken} = require('./authentication')
const {ADMIN, MANAGER, EMPLOYEE} = require('./consts')


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

const hasStatusRegister = () => {
  return localStorage.getItem('setAlfredRegister') == 'true'
}

const getLoggedUser = () => {
  if (typeof localStorage=='undefined') {
    return null
  }
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }
  const data=token.split(' ')[1]
  const decoded = jwt.decode(data);
  return decoded
}

const getLoggedUserId = () => {
  const logged=getLoggedUser()
  return logged && logged.id
}

const isLoggedUserAdmin = () => {
  const logged=getLoggedUser()
  return logged && logged.is_admin
}

const isLoggedUserAlfred = () => {
  const logged=getLoggedUser()
  return logged && logged.is_alfred
}

const isLoggedUserAlfredPro = () => {
  const logged=getLoggedUser()
  return logged && logged.is_alfred_pro
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

const getUserLabel = user => {
  return new Promise( (resolve, reject) => {
    if (!user) {
      resolve('')
    }
    if (user.company) {
      setAxiosAuthentication()
      axios.get(`/myAlfred/api/companies/name/${user.company}`)
        .then ( res => {
          resolve(`${user.firstname} pour ${res.data.name}`)
        })
        .catch( err => {
          console.error(err)
          resolve(user.firstname)
        })
    }
    else {
      resolve(user.firstname)
    }
  })
}

module.exports = {
  is_b2b_style, is_b2b_employee, is_b2b_admin, is_b2b_manager, is_mode_company, is_application, is_mobile,
  get_role,setStatusRegister,removeStatusRegister, hasStatusRegister,
  getLoggedUserId,getLoggedUser,
  isLoggedUserAdmin, isEditableUser, isLoggedUserAlfred, isLoggedUserAlfredPro,
  getUserLabel,isLoggedUserRegistered
}
