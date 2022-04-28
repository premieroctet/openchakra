import React from 'react'
import BaseCreateTable from'./BaseCreateTable'
const {orderColumns} = require('./tablestructures')


const OrderCreate = ({accessRights}) => {

  return (
    <BaseCreateTable storage={'order'} endpoint='orders' columns={orderColumns} wordingSection={'EDI.ORDER'} accessRights={accessRights}/>
  )
}

module.exports=OrderCreate
