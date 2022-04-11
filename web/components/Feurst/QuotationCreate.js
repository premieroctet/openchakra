import React from 'react'
import BaseCreateTable from'./BaseCreateTable'
const {quotationColumns} = require('./tablestructures')


const QuotationCreate = ({}) => {

  return (
    <BaseCreateTable storage={'quotation'} endpoint='quotations' columns={quotationColumns}/>
  )
}

module.exports=QuotationCreate
