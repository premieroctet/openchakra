import {CLOSE_NOTIFICATION_DELAY} from '../utils/consts'
import {snackBarError} from '../utils/notifications'
import {setAxiosAuthentication} from '../utils/authentication'
import axios from 'axios'
import BasePage from './basePage'
import {setAlfredRegistering} from '../utils/context'
import Router from 'next/router'

class RegisterServices extends BasePage {

  componentDidMount() {
    const registerCode=this.getURLProp('id')
    setAxiosAuthentication()
    const promise=registerCode ? axios.get(`/myAlfred/api/users/check_register_code/${registerCode}`) : Promise.resolve()
    promise
      .then(() => {
        setAlfredRegistering(registerCode)
        Router.push('/?register=true')
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data)
        setTimeout(() => Router.push('/'), CLOSE_NOTIFICATION_DELAY*1000)
      })
  }

  render() {
    return null
  }
}

export default RegisterServices
