import React from 'react'
const {ordersColumns} = require('./tablestructures')
const BaseListTable = require('./BaseListTable')

const MyOrders = () => {

  return (
    <BaseListTable endpoint='orders' columns={ordersColumns} />
  )
}

export default MyOrders
