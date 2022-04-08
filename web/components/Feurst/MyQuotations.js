import React from 'react'
const BaseListTable = require('./BaseListTable')
const {quotationsColumns} = require('./tablestructures')

const MyQuotations = () => {

  return (
    <BaseListTable endpoint='quotations' columns={quotationsColumns} />
  )
}

export default MyQuotations
