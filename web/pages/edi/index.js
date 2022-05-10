import React from 'react'
import {BASEPATH_EDI} from '../../utils/consts'
import withEdiAuth from '../../hoc/withEdiAuth'


const HomeEdi = ({user}) => {
  return (<div>Hello, {JSON.stringify(user)}</div>)
}

export default withEdiAuth(HomeEdi, {pathAfterFailure: `${BASEPATH_EDI}/login`})
