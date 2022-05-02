import React from 'react'
import BaseCreateTable from'./BaseCreateTable'
const {quotationColumns} = require('./tablestructures')


const QuotationCreate = ({accessRights}) => {

  return (
    <BaseCreateTable storage={'quotation'} endpoint='quotations' columns={quotationColumns} wordingSection={'EDI.QUOTATION'} accessRights={accessRights}/>
  )
}

module.exports=QuotationCreate
