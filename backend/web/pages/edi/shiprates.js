import React from 'react'
import withEdiAuth from '../../hoc/withEdiAuth'
import {BASEPATH_EDI, SHIPRATE, VIEW} from '../../utils/feurst/consts'
import ShipratesList from '../../components/Feurst/ShipratesList'

const List = ({accessRights}) => {

  return (<>
    <ShipratesList accessRights={accessRights} />
  </>)
}

export default withEdiAuth(List, {model: SHIPRATE, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
