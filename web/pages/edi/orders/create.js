import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import {CREATE, ORDER, BASEPATH_EDI} from '../../../utils/consts'
import OrderCreate from '../../../components/Feurst/OrderCreate'

const Orders = ({accessRights}) => {

  return (<>
    <OrderCreate accessRights={accessRights} />
  </>)
}

export default withEdiAuth(Orders, {model: ORDER, action: CREATE, pathAfterFailure: `${BASEPATH_EDI}/login`})
