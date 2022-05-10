import React from 'react'
import withEdiAuth from '../../../hoc/withEdiAuth'
import ProductsList from '../../../components/Feurst/ProductsList'
import {PRODUCT, VIEW, BASEPATH_EDI} from '../../../utils/consts'

const ProductList = ({accessRights}) => {

  return (<>
    <ProductsList accessRights={accessRights} />
  </>)
}

export default withEdiAuth(ProductList, {model: PRODUCT, action: VIEW, pathAfterFailure: `${BASEPATH_EDI}/login`})
