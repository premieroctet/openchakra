import React from 'react'
import Validator from 'validator'
import axios from 'axios'
import debounce from 'lodash/debounce'
import {setAuthToken, setAxiosAuthentication} from '../utils/authentication'
import {snackBarError} from '../utils/notifications'

function withLogin(WrappedComponent) {
  
  return class extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        username: '',
        password: '',
        errors: {},
        showPassword: false,
        // Roles : null : pas de réposne du serveur, [] : réponse serveur pas de rôle pour l'email
        roles: null,
        selectedRole: null,
      }
    }

    debouncedCallForUserName = debounce(async username => {
      
      if (Validator.isEmail(username)) {
        return await axios.get(`/myAlfred/api/users/roles/${username}`)
          .then(res => {
            const roles = res.data
            const selectedRole = roles.length == 1 ? roles[0] : null
            // console.log('here are the roles', roles)
            this.setState({...this.state, roles, selectedRole})
          })
          .catch(err => {
            console.error(err)
            this.setState({...this.state, roles: [], selectedRole: null})
          })
      }
      return
    }, 700)
  
    onChange = async e => {
      const {name, value} = e.target
      const newState = {...this.state, [name]: value}
      this.setState(newState)
    }

    onUserNameChange = e => {
      const username = e.target.value
      this.setState({...this.state, username})
      this.debouncedCallForUserName(username)
    }
  
    onSubmit = e => {
      e.preventDefault()
  
      const user = {
        username: this.state.username,
        password: this.state.password,
        role: this.state.selectedRole,
      }
  
      axios.post('/myAlfred/api/users/login', user)
        .then(() => {
          setAuthToken()
          setAxiosAuthentication()
          this.props.login()
        })
        .catch(err => {
          console.error(err)
          if (err.response) {
            snackBarError(err.response.data)
            this.setState({...this.state, errors: err.response.data})
          }
        })
    }
  
    handleClickShowPassword = () => {
      this.setState({...this.state, showPassword: !this.state.showPassword})
    }
  
    handleMouseDownPassword = event => {
      event.preventDefault()
    }

    render() {
      return <WrappedComponent
        state={this.state}
        onChange={this.onChange}
        onUserNameChange={this.onUserNameChange}
        onSubmit={this.onSubmit}
        handleClickShowPassword={this.handleClickShowPassword}
        handleMouseDownPassword={this.handleMouseDownPassword}
        {...this.props} />
    }
  }
}

export default withLogin
