import React, {useEffect, useMemo, useState} from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const {BASEPATH_EDI} = require('../../../utils/feurst/consts')
const {CREATE, QUOTATION} = require('../../../utils/consts')
const MyQuotations = require('../../../components/Feurst/MyQuotations')

const Orders = ({accessRights}) => {

  return (<>
    <MyQuotations accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(Orders, {model: QUOTATION, action: CREATE, pathAfterFailure: `${BASEPATH_EDI}/login`})
