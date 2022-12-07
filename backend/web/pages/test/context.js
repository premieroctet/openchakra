import {withTranslation} from 'react-i18next'
import React from 'react';
import axios from 'axios'
const {getLoggedUser}=require('../../utils/context')
const {setAxiosAuthentication} = require('../../utils/authentication')

class ContextTest extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: null,
      server_context: null,
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then(response => {
        this.setState({user: response.data})
      })
      .catch(err => console.error(err))
    setAxiosAuthentication()
    axios.get('/myAlfred/api/admin/context')
      .then(response => {
        this.setState({server_context: response.data})
      })
      .catch(err => console.error(err))
  }

  render() {
    const {server_context} = this.state

    return(
      <>
        <h1>Valeur token</h1>
        <div>{JSON.stringify(getLoggedUser())}</div>
        <h1>Contexte serveur</h1>
        <div>{JSON.stringify(server_context)}</div>
      </>
    )
  }

}

export default withTranslation(null, {withRef: true})(ContextTest)
