import React from 'react'
import {QUOTATIONURLSEGMENT} from '../../utils/consts'
import BaseCreateTable from'./BaseCreateTable'
const {quotationColumns} = require('./tablestructures')


const QuotationCreate = ({accessRights}) => {

  return (
    <BaseCreateTable storage={'quotation'} endpoint={QUOTATIONURLSEGMENT} columns={quotationColumns} wordingSection={'EDI.QUOTATION'} accessRights={accessRights}/>
  )
}

module.exports=QuotationCreate
