import React from 'react'
import {ENDPOINTS, QUOTATION} from '../../utils/feurst/consts'
import BaseCreate from'./BaseCreate'
import {quotationColumns} from './tablestructures'


const QuotationCreate = ({accessRights}) => {

  return (
    <BaseCreate
      endpoint={ENDPOINTS[QUOTATION]}
      columns={quotationColumns}
      wordingSection={'EDI.QUOTATION'}
      accessRights={accessRights}
    />
  )
}

export default QuotationCreate
