import React from 'react'
import {ENDPOINTS, QUOTATION} from '../../utils/consts'
import BaseCreateTable from'./BaseCreateTable'
const {quotationColumns} = require('./tablestructures')


const QuotationCreate = ({accessRights}) => {

  return (
    <BaseCreateTable storage={'quotation'} endpoint={ENDPOINTS[QUOTATION]} columns={quotationColumns} wordingSection={'EDI.QUOTATION'} accessRights={accessRights}/>
  )
}

module.exports=QuotationCreate
