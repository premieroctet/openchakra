import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const {BASEPATH_EDI} = require('../../../utils/feurst/consts')
const {SHIPRATE, VIEW} = require('../../../utils/consts')
const ShipratesList = require('./list')

const List = ({accessRights}) => {

  return (<>
    <ShipratesList accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(List, {model: SHIPRATE, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
