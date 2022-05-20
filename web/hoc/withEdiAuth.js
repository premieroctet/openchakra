import React from 'react'
import Router from 'next/router'
import {ThemeProvider} from 'styled-components'
import uniqBy from 'lodash/uniqBy'
import isUndefined from 'lodash/isUndefined'
import styled from 'styled-components'
import Header from '../components/Feurst/Header'
import Footer from '../components/Feurst/Footer'
import {getLoggedUser} from '../utils/context'
import {theme, GlobalStyleEdi} from '../styles/feurst/feurst.theme'
import {client} from '../utils/client'
import {BASEPATH_EDI, API_PATH} from '../utils/feurst/consts'
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
  class ediAuth extends React.Component {
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
        await this.getUserRoles()
          .then(actions => this.setState({loading: false, user: isLoggedUser, actions}))
          .catch(e => console.error(e))
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

      const accessRights=new AccessRights(options.model, options.action, actions)
      const canAccess = [accessRights.getModel(), accessRights.getAction()].every(isUndefined) || accessRights.isActionAllowed(accessRights.getModel(), accessRights.getAction())

      return (
        <ThemeProvider theme={theme}>
          {is_development() &&
            <h1>{`model:${accessRights.getModel()}, action:${accessRights.getAction()}, compte:${account}`}</h1>
          }
          <Skeleton>
            <Header accessRights={accessRights} />
            <Tabs accessRights={accessRights} />
            <div className='container-lg'>
              {canAccess ?
                <Component accessRights={accessRights} />
                : loading ? '' : <div>Vous n'avez pas accès à cette rubrique</div>}
            </div>
            <Footer />
          </Skeleton>
          <GlobalStyleEdi />
        </ThemeProvider>
      )
    }
  }

  return ediAuth
}

const Skeleton = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 3rem auto auto 1fr 3rem; // infobox, header, tabs, content, footer
  grid-template-columns: 1fr;
`

export default withEdiAuth
