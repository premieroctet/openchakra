import React, {useEffect} from 'react'
import withEdiAuth from '../../hoc/withEdiAuth'
const {BASEPATH_EDI} = require('../../utils/consts')


const HomeEdi = ({user}) => {
  return (<div>Hello, {JSON.stringify(user)}</div>)
}

module.exports=withEdiAuth(HomeEdi, {pathAfterFailure: `${BASEPATH_EDI}/login`})
