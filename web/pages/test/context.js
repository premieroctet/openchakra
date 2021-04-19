import React from 'react';
import axios from 'axios'

const {getLoggedUser}=require('../../utils/functions')
const {is_b2b_admin, is_b2b_manager}=require('../../utils/context')
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

    console.log(`User:${user}, is_b2b_admin:${is_b2b_admin(user)}`)
    return(
      <>
        <h1>Valeur token</h1>
        <div>{JSON.stringify(getLoggedUser())}</div>
        <h1>is_b2b_admin</h1>
        <div>{is_b2b_admin(user) ? 'Oui' : 'Non'}</div>
        <h1>is_b2b_manager</h1>
        <div>{is_b2b_manager(user) ? 'Oui' : 'Non'}</div>
        <h1>Contexte serveur</h1>
        <div>{JSON.stringify(server_context)}</div>
      </>
    )
  }

}

export default ContextTest
