import React from 'react'
import {ordersColumns} from './tablestructures'
import BaseListTable from './BaseListTable'

const MyOrders = ({accessRights}) => {

  return (
    <BaseListTable
      caption='Historique des commandes'
      endpoint='orders'
      columns={ordersColumns}
      accessRights={accessRights}
    />
  )
}

export default MyOrders
