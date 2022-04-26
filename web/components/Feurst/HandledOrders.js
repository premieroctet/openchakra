import React from 'react'
const {handledOrdersColumns, ordersColumns} = require('./tablestructures')
const BaseListTable = require('./BaseListTable')

const HandledOrders = () => {

  return (
    <BaseListTable caption='Historique des commandes' endpoint='orders' columns={handledOrdersColumns} />
  )
}

module.exports=HandledOrders
