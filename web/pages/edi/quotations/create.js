import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const {BASEPATH_EDI, CREATE, QUOTATION} = require('../../../utils/consts')
const Quotationcreate = require('../../../components/Feurst/QuotationCreate')

const Orders = ({accessRights}) => {

  return (<>
    <Quotationcreate accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(Orders, {model: QUOTATION, action: CREATE, pathAfterFailure: `${BASEPATH_EDI}/login`})
