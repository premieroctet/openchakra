import React from 'react'
import BaseListTable from './BaseListTable'
import {quotationsColumns} from './tablestructures'

const MyQuotations = () => {

  return (
    <BaseListTable caption='Historique des devis' endpoint='quotations' columns={quotationsColumns} />
  )
}

export default MyQuotations
