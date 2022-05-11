import React from 'react'
import {ENDPOINTS, ORDER} from '../../utils/consts'
import BaseCreateTable from'./BaseCreateTable'
const {orderColumns} = require('./tablestructures')


const OrderCreate = ({accessRights}) => {

  return (
    <BaseCreateTable storage={'order'} endpoint={ENDPOINTS[ORDER]} columns={orderColumns} wordingSection={'EDI.ORDER'} accessRights={accessRights}/>
  )
}

module.exports=OrderCreate
