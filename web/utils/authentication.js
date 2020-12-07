import axios from 'axios';
import cookie from 'react-cookies'

const setAxiosAuthentication = () => {
  const token = cookie.load('token')
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

const clearAuthenticationToken = () => {
  cookie.remove('token', {path: '/'});  
}

module.exports={setAxiosAuthentication, clearAuthenticationToken}
