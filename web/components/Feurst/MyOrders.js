import React from 'react'
import {ordersColumns} from './tablestructures'
import BaseListTable from './BaseListTable'

const MyOrders = () => {

  return (
    <BaseListTable caption='Historique des commandes' endpoint='orders' columns={ordersColumns} />
  )
}

export default MyOrders
