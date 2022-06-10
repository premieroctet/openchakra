import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import {ORDER, BASEPATH_EDI} from '../../../utils/consts'
import HandledOrders from '../../../components/Feurst/HandledOrders'
import {HANDLE} from '../../../utils/feurst/consts'

const Orders = ({accessRights}) => {

  return (<>
    <HandledOrders accessRights={accessRights} />
  </>)
}

export default withEdiAuth(Orders, {model: ORDER, action: HANDLE, pathAfterFailure: `${BASEPATH_EDI}/login`})
