import {Component} from 'react'
import Router from 'next/router'
import {clearAuthenticationToken} from '../utils/authentication'

class Logout extends Component {

  componentDidMount() {
    clearAuthenticationToken()
    Router.push('/')
  }

  render() {
    return null
  }
}

export default Logout
