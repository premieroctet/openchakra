import React from 'react'
import {ORDERURLSEGMENT} from '../../utils/consts'
import BaseCreateTable from'./BaseCreateTable'
const {orderColumns} = require('./tablestructures')


const OrderCreate = ({accessRights}) => {

  return (
    <BaseCreateTable storage={'order'} endpoint={ORDERURLSEGMENT} columns={orderColumns} wordingSection={'EDI.ORDER'} accessRights={accessRights}/>
  )
}

module.exports=OrderCreate
