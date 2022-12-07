import React from 'react'

import {productsColumns} from './tablestructures'
import BaseListTable from './BaseListTable'

const ProductsList = ({accessRights}) => {

  return (
    <>
      <BaseListTable caption='Liste des articles' endpoint='products' columns={productsColumns} accessRights={accessRights}/>
    </>
  )
}

export default ProductsList
