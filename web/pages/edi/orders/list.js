import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import {ORDER, VIEW, BASEPATH_EDI} from '../../../utils/feurst/consts'
import MyOrders from '../../../components/Feurst/MyOrders'

const Orders = ({accessRights}) => {

  return (<>
    <MyOrders accessRights={accessRights} />
  </>)
}

export default withEdiAuth(Orders, {model: ORDER, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
