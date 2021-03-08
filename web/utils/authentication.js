import axios from 'axios';
import cookie from 'react-cookies'
const jwt = require('jsonwebtoken');

const setAuthToken = () => {
  if (typeof localStorage=='undefined') {
    console.error('Can not set auth token, undefined localStorage')
    return null
  }
  const token=cookie.load('token')
  localStorage.setItem('token', token)
}

const getAuthToken = () => {
  if (typeof localStorage=='undefined') {
    console.debug('Can not get auth token, undefined localStorage')
    return null
  }
  const token = localStorage.getItem('token')
  if (!token) {
    console.debug('No token in storage')
    return null
  }

  const decoded = jwt.decode(token.split(' ')[1]);
  console.log(`Token:${decoded}`)
  return decoded
}

const setAxiosAuthentication = () => {
  if (typeof localStorage=='undefined') {
    console.log(`Can not set axios authentication, undefined localStorage`)
    return null
  }
  const token = localStorage.getItem('token')
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization']
  }
};

const clearAuthenticationToken = () => {
  if (typeof localStorage=='undefined') {
    console.log(`Can not clear authentication token, undefined localStorage`)
    return null
  }
  localStorage.removeItem('token')
}

module.exports={
  setAxiosAuthentication, clearAuthenticationToken, setAuthToken, getAuthToken
}
