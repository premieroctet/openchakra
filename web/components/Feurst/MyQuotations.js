import React from 'react'
import BaseListTable from './BaseListTable'
import {quotationsColumns} from './tablestructures'

const MyQuotations = ({accessRights}) => {

  return (
    <BaseListTable
      caption='Historique des devis'
      endpoint='quotations'
      columns={quotationsColumns}
      accessRights={accessRights}
      wordingSection={'EDI.QUOTATION'}
    />
  )
}

export default MyQuotations
