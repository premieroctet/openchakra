import React from 'react'
import {ENDPOINTS, ORDER} from '../../utils/consts'
import BaseCreate from'./BaseCreate'
import {orderColumns} from './tablestructures'


const OrderCreate = ({accessRights}) => {

  return (
    <BaseCreate
      endpoint={ENDPOINTS[ORDER]}
      columns={orderColumns}
      wordingSection={'EDI.ORDER'}
      accessRights={accessRights}
    />
  )
}

export default OrderCreate
