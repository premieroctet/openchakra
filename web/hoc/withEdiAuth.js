import React from 'react'
import Header from '../components/Feurst/Header'
import Router from 'next/router'
import {getLoggedUser} from '../utils/context'
import {ThemeProvider} from 'styled-components'
import {theme, GlobalStyleEdi} from '../styles/feurst.theme'
import {URL_BASEPATH} from '../mode'

export const feurstImgPath = '../../static/assets/img/feurst'
export const feurstPhoneNumber = '+33 4 77 27 40 63'
export const basePathEdi = '/edi'


const access = {
  FEURST_ADMIN: [
    {
      url: `${URL_BASEPATH}/edi/orders`,
      label: 'Commandes',
    },
    {
      url: `${URL_BASEPATH}/edi/account`,
      label: 'Mon compte',
    },
    {
      url: `${URL_BASEPATH}/edi/login?out`,
      label: 'Se déconnecter',
    },
  ],
}


const withEdiAuth = (Component = null, options = {}) => {
  class WithEdiAuth extends React.Component {
    state = {
      loading: true,
    };

    componentDidMount() {
      // TODO Fetch user rights
      const isLoggedUser = getLoggedUser()
      if (isLoggedUser) {
        this.setState({loading: false, user: isLoggedUser, role: 'FEURST_ADMIN'})
      }
      else {
        Router.push(options.pathAfterFailure || '/edi/login')
      }
    }

    render() {
      const {loading} = this.state

      if (loading) {
        return <div>...</div>
      }

      return (<ThemeProvider theme={theme}>
        <Header accessRights={access[this.state.role]} />
        <Component {...this.props}/>
        <GlobalStyleEdi />
      </ThemeProvider>)
    }
  }

  return WithEdiAuth
}

export default withEdiAuth
