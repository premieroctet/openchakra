import React, {useEffect, useMemo, useState} from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const {CREATE, QUOTATION, BASEPATH_EDI} = require('../../../utils/consts')
const Quotationcreate = require('../../../components/Feurst/QuotationCreate')

const Orders = ({accessRights}) => {

  return (<>
    <Quotationcreate accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(Orders, {model: QUOTATION, action: CREATE, pathAfterFailure: `${BASEPATH_EDI}/login`})
