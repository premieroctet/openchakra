import React from 'react'
import {BASEPATH_EDI, CREATE, QUOTATION} from '../../../utils/feurst/consts'
import withEdiAuth from '../../../hoc/withEdiAuth'
import Quotationcreate from '../../../components/Feurst/QuotationCreate'

const Orders = ({accessRights}) => {

  return (<>
    <Quotationcreate accessRights={accessRights} />
  </>)
}

export default withEdiAuth(Orders, {model: QUOTATION, action: CREATE, pathAfterFailure: `${BASEPATH_EDI}/login`})
