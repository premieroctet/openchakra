import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const Prices = require('../../../components/Feurst/Prices')
const {PRICELIST, VIEW, BASEPATH_EDI} = require('../../../utils/consts')

const List = ({accessRights}) => {

  return (<>
    <Prices accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(List, {model: PRICELIST, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
