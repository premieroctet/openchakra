import React, {useEffect} from 'react'
import withEdiAuth from '../../hoc/withEdiAuth'


const HomeEdi = ({user}) => {
  return (<div>Hello, {JSON.stringify(user)}</div>)
}

export default withEdiAuth(HomeEdi, {pathAfterFailure: '/edi/login'})
