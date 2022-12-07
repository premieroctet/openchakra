import React from 'react'
import axios from 'axios'
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
      }
    }

    onChange = async e => {
      const {name, value} = e.target
      const newState = {...this.state, [name]: value}
      this.setState(newState)
    }

    onUserNameChange = e => {
      const {name, value} = e.target
      const newState = {...this.state, [name]: value}
      this.setState(newState)
    }


    onSubmit = e => {
      e.preventDefault()

      const user = {
        username: this.state.username,
        password: this.state.password,
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
