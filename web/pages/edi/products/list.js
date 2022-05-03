import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const ProductsList = require('../../../components/Feurst/ProductsList')
const {PRODUCT, VIEW, BASEPATH_EDI} = require('../../../utils/consts')

const List = ({accessRights}) => {

  return (<>
    <ProductsList accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(List, {model: PRODUCT, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
