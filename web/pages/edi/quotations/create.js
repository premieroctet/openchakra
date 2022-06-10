import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import {BASEPATH_EDI, CREATE, QUOTATION} from '../../../utils/consts'
import Quotationcreate from '../../../components/Feurst/QuotationCreate'

const Orders = ({accessRights}) => {

  return (<>
    <Quotationcreate accessRights={accessRights} />
  </>)
}

export default withEdiAuth(Orders, {model: QUOTATION, action: CREATE, pathAfterFailure: `${BASEPATH_EDI}/login`})
