import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import {BASEPATH_EDI, CREATE, QUOTATION} from '../../../utils/consts'
import Quotationcreate from '../../../components/Feurst/QuotationCreate'

const CreateQuotation = ({accessRights}) => {

  return (<>
    <Quotationcreate accessRights={accessRights} />
  </>)
}

export default withEdiAuth(CreateQuotation, {model: QUOTATION, action: CREATE, pathAfterFailure: `${BASEPATH_EDI}/login`})
