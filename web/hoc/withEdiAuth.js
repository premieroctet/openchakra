import React from 'react'
import Header from '../components/Feurst/Header'
import Router from 'next/router'
import {getLoggedUser} from '../utils/context'
import {ThemeProvider} from 'styled-components'
import {theme, GlobalStyleEdi} from '../styles/feurst.theme'
import {client} from '../utils/client'
const lodash=require('lodash')
export const feurstImgPath = '../../static/assets/img/feurst'
export const feurstPhoneNumber = '+33 4 77 27 40 63'
export const basePathEdi = '/edi'


const availableSections = {
  FEURST_ADMIN: [
    {
      url: `/edi/orders`,
      label: 'Commandes',
    },
    {
      url: `/edi/account`,
      label: 'Mon compte',
    },
    {
      url: `/edi/login?out`,
      label: 'Se déconnecter',
    },
  ],
  CUSTOMER_SLAVE: [
    {
      url: `/edi/orders`,
      label: 'Commandes',
    },
    {
      url: `/edi/login?out`,
      label: 'Se déconnecter',
    },
  ],
}

class AccessRights {
  constructor(actions) {
    this.actions=actions
  }
  getModels= () => {
    console.log(`MOdels:${this.actions.map(a=> a.model)}`)
    return lodash.uniqBy(this.actions, a => a.model)
  }
  hasModel= model => {
    return !!this.actions.find(a => a.model==model)
  }
  isActionAllowed = (model, action) => {
    return !!this.actions.find(a => a.model==model && a.action==action)
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
        Router.push(options.pathAfterFailure || '/edi/login')
      }
    }

    render() {
      const {loading, actions, user} = this.state
      const sectionRights = user?.role ? availableSections[user.role] : []

      if (loading) {
        return <div>...</div>
      }

      const accessRights=new AccessRights(actions)
      return (<ThemeProvider theme={theme}>
        <Header accessRights={accessRights} />
        <div className='container'>
          <Component accessRights={accessRights} />
        </div>
        <GlobalStyleEdi />
      </ThemeProvider>)
    }
  }

  return WithEdiAuth
}

export default withEdiAuth
