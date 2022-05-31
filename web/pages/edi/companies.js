import React from 'react'
import CompaniesList from '../../components/Feurst/CompaniesList'
import withEdiAuth from '../../hoc/withEdiAuth'
import {BASEPATH_EDI, ACCOUNT, VIEW} from '../../utils/consts'

const Companies = ({accessRights}) => {

  return (<>
    <CompaniesList accessRights={accessRights} />
  </>)
}

export default withEdiAuth(Companies, {model: ACCOUNT, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
