import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import {ORDER, VIEW, BASEPATH_EDI} from '../../../utils/consts'
import MyOrders from '../../../components/Feurst/MyOrders'

const OrdersList = ({accessRights}) => {

  return (<>
    <MyOrders accessRights={accessRights} />
  </>)
}

export default withEdiAuth(OrdersList, {model: ORDER, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
