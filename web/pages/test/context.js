import React from 'react';
import axios from 'axios'
const {isB2BAdmin, isB2BManager, getLoggedUser}=require('../../utils/context')
const {setAxiosAuthentication} = require('../../utils/authentication')

class ContextTest extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      user : null,
      server_context: null,
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then( response => {
        this.setState({user : response.data})
      })
      .catch (err => console.error(err))
    setAxiosAuthentication()
    axios.get('/myAlfred/api/admin/context')
      .then( response => {
        this.setState({server_context : response.data})
      })
      .catch (err => console.error(err))
  }

  render() {
    const{classes} = this.props
    const {user, server_context} = this.state

    console.log(`User:${user}, isB2BAdmin:${isB2BAdmin(user)}`)
    return(
      <>
        <h1>Valeur token</h1>
        <div>{JSON.stringify(getLoggedUser())}</div>
        <h1>isB2BAdmin</h1>
        <div>{isB2BAdmin(user) ? 'Oui' : 'Non'}</div>
        <h1>isB2BManager</h1>
        <div>{isB2BManager(user) ? 'Oui' : 'Non'}</div>
        <h1>Contexte serveur</h1>
        <div>{JSON.stringify(server_context)}</div>
      </>
    )
  }

}

export default ContextTest
