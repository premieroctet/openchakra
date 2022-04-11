import React from 'react'
import BaseCreateTable from'./BaseCreateTable'
const {orderColumns} = require('./tablestructures')


const OrderCreate = ({storage, accessRights}) => {

  return (
    <BaseCreateTable storage={storage} endpoint='orders' columns={orderColumns} accessRights={accessRights}/>
  )
}

module.exports=OrderCreate
