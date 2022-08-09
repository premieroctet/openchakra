import React from 'react'
import {BASEPATH_EDI, HANDLE, QUOTATION} from '../../../utils/feurst/consts'
import withEdiAuth from '../../../hoc/withEdiAuth'
import HandledQuotations from '../../../components/Feurst/HandledQuotations'

const HandleQuotations = ({accessRights}) => {

  return (<>
    <HandledQuotations accessRights={accessRights} />
  </>)
}

export default withEdiAuth(HandleQuotations, {model: QUOTATION, action: HANDLE, pathAfterFailure: `${BASEPATH_EDI}/login`})
