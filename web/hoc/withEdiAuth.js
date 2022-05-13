import React from 'react'
import Router from 'next/router'
import {ThemeProvider} from 'styled-components'
import Header from '../components/Feurst/Header'
import {getLoggedUser} from '../utils/context'
import {theme, GlobalStyleEdi} from '../styles/feurst/feurst.theme'
import {client} from '../utils/client'
const lodash=require('lodash')
const {API_PATH, VIEW, HANDLE} = require('../utils/feurst/consts')
const {BASEPATH_EDI} = require('../utils/consts')
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

  getFullAction = () => {
    const actions=this.actions.filter(a => a.model==this.model && a.action==this.action)
    if (actions.length!=1) {
      return null
    }
    return actions[0]
  }
}


const withEdiAuth = (Component = null, options = {}) => {
  class WithEdiAuth extends React.Component {
    state = {
      loading: true,
      actions: [],
      account: null,
    };


    async getUserRoles() {
      return await client(`${API_PATH}/users/actions`)
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

      if (is_development()) {
        client(`${API_PATH}/users/current`)
          .then(res => {
            this.setState({account: `${res.full_name} (${res.email}), société ${res.company?.name}, rôles ${res.roles}`})
          })
      }
    }

    render() {
      const {loading, actions, account} = this.state

      if (loading) {
        return <div>...</div>
      }

      const accessRights=new AccessRights(options.model, options.action, actions)
      const canAccess = accessRights.isActionAllowed(accessRights.getModel(), accessRights.getAction())

      return (
        <ThemeProvider theme={theme}>
          {is_development() &&
            <h1>{`model:${accessRights.getModel()}, action:${accessRights.getAction()}, compte:${account}`}</h1>
          }
          <Header accessRights={accessRights} />
          <Tabs accessRights={accessRights} />
          <div className='container-lg'>
            {canAccess ?
              <Component accessRights={accessRights} />
              : <div>Vous n'avez pas accès à cette rubrique</div>}
          </div>
          <GlobalStyleEdi />
        </ThemeProvider>
      )
    }
  }

  return WithEdiAuth
}

module.exports=withEdiAuth
