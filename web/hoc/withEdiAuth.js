import React from 'react'
import Router from 'next/router'
import {ThemeProvider} from 'styled-components'
import Header from '../components/Feurst/Header'
import {getLoggedUser} from '../utils/context'
import {theme, GlobalStyleEdi} from '../styles/feurst.theme'
import {client} from '../utils/client'
const lodash=require('lodash')
const {is_development} = require('../config/config')
const Tabs = require('../components/Feurst/Tabs')

class AccessRights {
  constructor(model, action, actions) {
    this.actions=actions
    this.model=model
    this.action=action
  }

  getModels= () => {
    return lodash.uniqBy(this.actions, a => a.model).map(a => a.model)
  }
  hasModel= model => {
    return !!this.actions.find(a => a.model==model)
  }
  isActionAllowed = (model, action) => {
    return !!this.actions.find(a => a.model==model && a.action==action)
  }
  getModel = () => {
    return this.model
  }
  getAction = () => {
    return this.action
  }
}


const withEdiAuth = (Component = null, options = {}) => {
  class WithEdiAuth extends React.Component {
    state = {
      loading: true,
      actions: [],
    };


    async getUserRoles() {
      return await client('myAlfred/api/users/actions')
        .catch(e => {
          console.error(e, 'Cant fetch users roles')
          return []
        })
    }

    async componentDidMount() {

      const isLoggedUser = getLoggedUser()

      if (isLoggedUser) {
        const actions = await this.getUserRoles()
          .catch(e => console.error(e))
        this.setState({loading: false, user: isLoggedUser, actions})
      }
      else {
        Router.push(options.pathAfterFailure || `${BASEPATH_EDI}/login`)
      }
    }

    render() {
      const {loading, actions} = this.state

      if (loading) {
        return <div>...</div>
      }

      const accessRights=new AccessRights(options.model, options.action, actions)
      return (
        <ThemeProvider theme={theme}>
          {is_development() && <h1>{`model:${accessRights.getModel()}, action:${accessRights.getAction()}`}</h1>}
          <Header accessRights={accessRights} />
          <Tabs accessRights={accessRights} />
          <div className='container'>
            <Component accessRights={accessRights} />
          </div>
          <GlobalStyleEdi />
        </ThemeProvider>
      )
    }
  }

  return WithEdiAuth
}

module.exports=withEdiAuth
