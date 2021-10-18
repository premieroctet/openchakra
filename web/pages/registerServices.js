import {setAlfredRegistering} from '../utils/context'
import {Component} from 'react'
import Router from 'next/router'

class RegisterServices extends Component {

  componentDidMount() {
    setAlfredRegistering()
    Router.push('/?register=true')
  }

  render() {
    return null
  }
}

export default RegisterServices
