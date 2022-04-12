import React, {useEffect, useMemo, useState} from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
const Products = require('../../../components/Feurst/Products')
const {PRODUCT, VIEW, BASEPATH_EDI} = require('../../../utils/consts')

const List = ({accessRights}) => {

  return (<>
    <Products accessRights={accessRights} />
  </>)
}

module.exports=withEdiAuth(List, {model: PRODUCT, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
