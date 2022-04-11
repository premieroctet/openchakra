import React, {useEffect, useMemo, useState} from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const {CREATE, QUOTATION} = require('../../../utils/consts')
const MyQuotations = require('../../../components/Feurst/MyQuotations')

const Orders = ({accessRights}) => {

  return (<>
    <MyQuotations accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(Orders, {model: QUOTATION, action: CREATE, pathAfterFailure: '/edi/login'})
