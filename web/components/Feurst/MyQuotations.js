import React from 'react'
const BaseListTable = require('./BaseListTable')
const {quotationsColumns} = require('./tablestructures')

const MyQuotations = () => {

  return (
    <BaseListTable caption='Historique des devis' endpoint='quotations' columns={quotationsColumns} />
  )
}

module.exports=MyQuotations
