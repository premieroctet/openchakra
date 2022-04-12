import React, {useEffect, useMemo, useState} from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const {ORDER, VIEW, BASEPATH_EDI} = require('../../../utils/consts')
const MyOrders = require('../../../components/Feurst/MyOrders')

const Orders = ({accessRights}) => {

  return (<>
    <MyOrders accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(Orders, {model: ORDER, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
