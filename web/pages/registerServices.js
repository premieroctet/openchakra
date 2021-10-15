import {setStatusRegister} from '../utils/context'
import {Component} from 'react'
import Router from 'next/router'

class RegisterServices extends Component {

  componentDidMount() {
    setStatusRegister()
    Router.push('/?register=true')
  }

  render() {
    return null
  }
}

export default RegisterServices
