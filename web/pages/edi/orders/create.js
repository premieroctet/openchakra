import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import {CREATE, ORDER, BASEPATH_EDI} from '../../../utils/feurst/consts'
import OrderCreate from '../../../components/Feurst/OrderCreate'

const CreateOrder = ({accessRights}) => {

  return (<>
    <OrderCreate accessRights={accessRights} />
  </>)
}

export default withEdiAuth(CreateOrder, {model: ORDER, action: CREATE, pathAfterFailure: `${BASEPATH_EDI}/login`})
