import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import {BASEPATH_EDI} from '../../../utils/feurst/consts'
import {VIEW, QUOTATION} from '../../../utils/consts'
import MyQuotations from '../../../components/Feurst/MyQuotations'

const QuotationsList = ({accessRights}) => {

  return (
    <MyQuotations accessRights={accessRights} />
  )
}

export default withEdiAuth(QuotationsList, {model: QUOTATION, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
