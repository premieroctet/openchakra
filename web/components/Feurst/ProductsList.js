import React, {useState} from 'react'
import {API_PATH} from'../../utils/feurst/consts'
import ImportExcelFile from './ImportExcelFile'

import {productsColumns} from './tablestructures'
import BaseListTable from './BaseListTable'

const ProductsList = ({accessRights}) => {

  const IMPORTS=[
    {title: 'Import articles', url: `${API_PATH}/products/import`},
    {title: 'Import stock', url: `${API_PATH}/products/import-stock`},
  ]

  const [refresh, setRefresh]=useState(false)

  const toggleRefresh= () => setRefresh(!refresh)

  return (
    <>
      <div display='flex' flexDirection='row'>
        {IMPORTS.map((imp, i) => (<ImportExcelFile key={`impproduct${i}`} caption={imp.title} importURL={imp.url} templateURL={null} onImport={toggleRefresh}/>))}
      </div>
      <BaseListTable caption='Liste des articles' endpoint='products' columns={productsColumns} />
    </>
  )
}

export default ProductsList
