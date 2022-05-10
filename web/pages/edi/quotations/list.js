import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import {VIEW, QUOTATION, BASEPATH_EDI} from '../../../utils/feurst/consts'
import MyQuotations from '../../../components/Feurst/MyQuotations'

const Quotations = ({accessRights}) => {

  return (<>
    <MyQuotations accessRights={accessRights} />
  </>)
}

export default withEdiAuth(Quotations, {model: QUOTATION, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
