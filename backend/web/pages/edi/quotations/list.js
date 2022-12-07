import React from 'react'
import {BASEPATH_EDI, QUOTATION, VIEW} from '../../../utils/feurst/consts'
import withEdiAuth from '../../../hoc/withEdiAuth'
import MyQuotations from '../../../components/Feurst/MyQuotations'

const QuotationsList = ({accessRights}) => {

  return (
    <MyQuotations accessRights={accessRights} />
  )
}

export default withEdiAuth(QuotationsList, {model: QUOTATION, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
