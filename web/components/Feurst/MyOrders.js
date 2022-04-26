import React from 'react'
const {ordersColumns} = require('./tablestructures')
const BaseListTable = require('./BaseListTable')

const MyOrders = () => {

  return (
    <BaseListTable caption='Historique des commandes' endpoint='orders' columns={ordersColumns} />
  )
}

module.exports=MyOrders
