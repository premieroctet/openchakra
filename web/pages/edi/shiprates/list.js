import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import {SHIPRATE, VIEW, BASEPATH_EDI} from '../../../utils/feurst/consts'
import ShipratesList from './list'

const List = ({accessRights}) => {

  return (<>
    <ShipratesList accessRights={accessRights} />
  </>)
}

export default withEdiAuth(List, {model: SHIPRATE, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
