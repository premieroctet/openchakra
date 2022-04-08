import React from 'react'
import BaseCreateTable from'./BaseCreateTable'
const {orderColumns} = require('./tablestructures')


const OrderCreate = ({storage}) => {

  return (
    <BaseCreateTable storage={storage} endpoint='orders' columns={orderColumns} />
  )
}

module.exports=OrderCreate
