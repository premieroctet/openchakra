import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import uniqBy from 'lodash/uniqBy'
import isUndefined from 'lodash/isUndefined'
import DevLog from '../components/DevLog'
import {client} from '../utils/client'
import {API_PATH} from '../utils/consts'
import {BASEPATH_EDI} from '../utils/feurst/consts'
import {is_development} from '../config/config'
import Tabs from '../components/Feurst/Tabs'
import {UserContext} from '../contextes/user.context'
import EdiContainer from '../components/Feurst/EdiContainer'
import {getLoggedUser} from '../utils/context'


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

  class EdiAuth extends React.Component {
    state = {
      user: null,
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
      const {user} = this.context

      if (isLoggedUser) {
        await this.getUserRoles()
          .then(actions => this.setState({loading: false, actions}))
          .catch(e => {
            console.error(e)
          })

        if (is_development()) {
          this.setState({account: `${user?.full_name} (${user?.email}), société ${user?.company?.name || 'Feurst'}`})
        }
      }
      else if (options?.force !== true) {
        Router.push(options.pathAfterFailure || `${BASEPATH_EDI}/login`)
      }

    }

    componentDidUpdate() {
      const {user} = this.context

      if (user && !user?.cgv_valid) {
        if (Router.router.pathname !== `${BASEPATH_EDI}/cgv`) {
          Router.push(`${BASEPATH_EDI}/cgv`)
        }
      }
    }


    render() {
      const {loading, actions, account} = this.state

      const accessRights=new AccessRights(options.model, options.action, actions)
      const canAccess = [accessRights.getModel(), accessRights.getAction()].every(isUndefined) || accessRights.isActionAllowed(accessRights.getModel(), accessRights.getAction())

      return (<>
        <DevLog>
          <h1>{`model:${accessRights.getModel()}, action:${accessRights.getAction()}, compte:${account}`}</h1>
        </DevLog>

        <EdiContainer accessRights={accessRights}>
          <Tabs accessRights={accessRights} />
          <div className='container-lg'>
            {loading ? ''
              : canAccess ?
                <Component accessRights={accessRights} /> : <div className='flex justify-center gap-x-2'>Vous n'avez pas accès à cette rubrique <Link href={`${BASEPATH_EDI}/login?out=true`}>Se déconnecter</Link> </div>}
          </div>
        </EdiContainer>
      </>
      )
    }
  }

  EdiAuth.contextType = UserContext

  return EdiAuth
}

export default withEdiAuth
