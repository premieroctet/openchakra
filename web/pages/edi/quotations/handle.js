import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import HandledQuotations from '../../../components/Feurst/HandledQuotations'
const {ORDER, BASEPATH_EDI} = require('../../../utils/consts')
const {HANDLE, QUOTATION} = require('../../../utils/feurst/consts')

const HandleQuotations = ({accessRights}) => {

  return (<>
    <HandledQuotations accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(HandleQuotations, {model: QUOTATION, action: HANDLE, pathAfterFailure: `${BASEPATH_EDI}/login`})
