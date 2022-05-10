import React from 'react'
import Router from 'next/router'
import {ThemeProvider} from 'styled-components'
import {uniqBy} from 'lodash'
import Header from '../components/Feurst/Header'
import {getLoggedUser} from '../utils/context'
import {theme, GlobalStyleEdi} from '../styles/feurst/feurst.theme'
import {client} from '../utils/client'
import {API_PATH, BASEPATH_EDI} from '../utils/feurst/consts'

import {is_development} from '../config/config'
import Tabs from '../components/Feurst/Tabs'

class AccessRights {
  constructor(model, action, actions) {
    this.actions=actions
    this.model=model
    this.action=action
  }

  getModels= () => {
    return uniqBy(this.actions, a => a.model).map(a => a.model)
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
  return class WithEdiAuth extends React.Component {
    state = {
      loading: true,
      actions: [],
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
    }

    render() {
      const {loading, actions} = this.state

      if (loading) {
        return <div>...</div>
      }

      const accessRights=new AccessRights(options.model, options.action, actions)
      return (
        <ThemeProvider theme={theme}>
          {is_development() &&
            <h1>{`model:${accessRights.getModel()}, action:${accessRights.getAction()}, compte:${['firstname', 'name'].map(a => getLoggedUser()[a])}`}</h1>
          }
          <Header accessRights={accessRights} />
          <Tabs accessRights={accessRights} />
          <div className='container-lg'>
            <Component accessRights={accessRights} />
          </div>
          <GlobalStyleEdi />
        </ThemeProvider>
      )
    }
  }

}

export default withEdiAuth
