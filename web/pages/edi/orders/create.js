import React, {useEffect, useMemo, useState} from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const {CREATE, ORDER} = require('../../../utils/consts')
const OrderCreate = require('../../../components/Feurst/OrderCreate')

const Orders = ({accessRights}) => {

  return (<>
    <OrderCreate accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(Orders, {model: ORDER, action: CREATE, pathAfterFailure: '/edi/login'})
