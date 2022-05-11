import React, {useEffect, useMemo, useState} from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const {BASEPATH_EDI} = require('../../../utils/feurst/consts')
const {VIEW, QUOTATION} = require('../../../utils/consts')
const MyQuotations = require('../../../components/Feurst/MyQuotations')

const Orders = ({accessRights}) => {

  return (<>
    <MyQuotations accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(Orders, {model: QUOTATION, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
