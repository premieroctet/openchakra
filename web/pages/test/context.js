import React from 'react';
import axios from 'axios'

const {getLoggedUser}=require('../../utils/functions')
const {is_b2b_admin, is_b2b_manager}=require('../../utils/context')
const {setAxiosAuthentication} = require('../../utils/authentication')

class ContextTest extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      user : null
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then( response => {
        this.setState({user : response.data})
      })
      .catch (err => console.error(err))
  }

  render() {
    const{classes} = this.props
    const {user} = this.state

    console.log(`User:${user}, is_b2b_admin:${is_b2b_admin(user)}`)
    return(
      <>
        <h1>Valeur token</h1>
        <div>{JSON.stringify(getLoggedUser())}</div>
        <h1>is_b2b_admin</h1>
        <div>{is_b2b_admin(user) ? 'Oui' : 'Non'}</div>
        <h1>is_b2b_manager</h1>
        <div>{is_b2b_manager(user) ? 'Oui' : 'Non'}</div>
      </>
    )
  }

}

export default ContextTest
