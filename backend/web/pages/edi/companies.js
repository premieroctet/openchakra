import React from 'react'
import CompaniesList from '../../components/Feurst/CompaniesList'
import withEdiAuth from '../../hoc/withEdiAuth'
import {BASEPATH_EDI, COMPANY, VIEW} from '../../utils/feurst/consts'

const Companies = ({accessRights}) => {

  return (<>
    <CompaniesList accessRights={accessRights} />
  </>)
}

export default withEdiAuth(Companies, {model: COMPANY, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
