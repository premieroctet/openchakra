import React from 'react'
import {ENDPOINTS, QUOTATION} from '../../utils/consts'
import BaseCreateTable from'./BaseCreateTable'
import {quotationColumns} from './tablestructures'


const QuotationCreate = ({accessRights}) => {

  return (
    <BaseCreateTable storage={'quotation'} endpoint={ENDPOINTS[QUOTATION]} columns={quotationColumns} wordingSection={'EDI.QUOTATION'} accessRights={accessRights}/>
  )
}

export default QuotationCreate
