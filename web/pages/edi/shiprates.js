import React from 'react'
import withEdiAuth from '../../hoc/withEdiAuth'
import {BASEPATH_EDI} from '../../utils/consts'
import {SHIPRATE, VIEW} from '../../utils/consts'
import ShipratesList from '../../components/Feurst/ShipratesList'

const List = ({accessRights}) => {

  return (<>
    <ShipratesList accessRights={accessRights} />
  </>)
}

export default withEdiAuth(List, {model: SHIPRATE, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
