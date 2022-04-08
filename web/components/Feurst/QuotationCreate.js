import React from 'react'
import BaseCreateTable from'./BaseCreateTable'
const {quotationColumns} = require('./tablestructures')


const QuotationCreate = ({storage}) => {

  return (
    <BaseCreateTable storage={storage} endpoint='quotations' columns={quotationColumns}/>
  )
}

module.exports=QuotationCreate
