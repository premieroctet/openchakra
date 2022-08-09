import React from 'react'
import {BASEPATH_EDI, HANDLE, ORDER} from '../../../utils/feurst/consts'
import withEdiAuth from '../../../hoc/withEdiAuth'
import HandledOrders from '../../../components/Feurst/HandledOrders'

const Orders = ({accessRights}) => {

  return (<>
    <HandledOrders accessRights={accessRights} />
  </>)
}

export default withEdiAuth(Orders, {model: ORDER, action: HANDLE, pathAfterFailure: `${BASEPATH_EDI}/login`})
