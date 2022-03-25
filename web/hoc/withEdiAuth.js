import React from 'react'
import Header from '../components/Feurst/Header'
import Router from 'next/router'
import {getLoggedUser} from '../utils/context'
import '../static/feurst.css'

export const feurstImgPath = '../../static/assets/img/feurst'
export const feurstPhoneNumber = '+33 4 77 27 40 63'
export const basePathEdi = '/edi'


const url = 'https://localhost'

const access = {
  FEURST_ADMIN: [
    {
      url: `${url}/edi/orders`,
      label: 'Commandes',
    },
    {
      url: `${url}/edi/account`,
      label: 'Mon compte',
    },
    {
      url: `${url}/edi/login?out`,
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

      return (<>
        <Header accessRights={access[this.state.role]} />
        <Component {...this.props}/>
      </>)
    }
  }

  return WithEdiAuth
}

export default withEdiAuth
