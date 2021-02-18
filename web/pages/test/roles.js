const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
const {snackBarError,snackBarSuccess, snackBarWarning}=require('../../utils/notifications')

class RolesTest extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      email: '',
      roles: [],
    }
  }

  onEmailChange = ev => {
    this.setState({email : ev.target.value}, this.getRoles)
  }

  getRoles = () => {
    const email=this.state.email
    axios.get(`/myAlfred/api/users/users/roles/${email}`)
      .then( response => {
        const roles = response.data
        this.setState({roles : roles})
        snackBarSuccess(JSON.stringify(roles))
        snackBarWarning(JSON.stringify(roles))
        snackBarError(JSON.stringify(roles))
      })
      .catch( err => {
        console.error(err)
        snackBarError(err.response.data)
        snackBarWarning(err.response.data)
        snackBarSuccess(err.response.data)
      })
  }

  render() {
    const {email, roles} = this.state

    console.log(`Roles:${JSON.stringify(roles)}`)
    return(
      <>
        <h1>Email</h1>
        <TextField
          name="email"
          value={email}
          onChange={this.onEmailChange}
        />
        <h1>Roles</h1>
        { roles.map(r => {
          return (
            <h2>{r}</h2>
          )
        })}
      </>
    );
  }

}

export default RolesTest
