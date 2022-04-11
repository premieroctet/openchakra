import React from 'react'
import BaseCreateTable from'./BaseCreateTable'
const {orderColumns} = require('./tablestructures')


const OrderCreate = ({accessRights}) => {

  return (
    <BaseCreateTable storage={'order'} endpoint='orders' columns={orderColumns} accessRights={accessRights}/>
  )
}

module.exports=OrderCreate
