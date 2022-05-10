import React, {useState} from 'react'
import ImportExcelFile from './ImportExcelFile'

import {pricesColumns} from './tablestructures'
import BaseListTable from './BaseListTable'

const PricesList = ({accessRights}) => {

  const IMPORTS=[
    {title: 'Import tarifs', url: '/myAlfred/api/prices/import'},
  ]

  const [refresh, setRefresh]=useState(false)
  const toggleRefresh= () => setRefresh(!refresh)

  return (
    <>
      <div display='flex' flexDirection='row'>
        {IMPORTS.map(imp => (<ImportExcelFile caption={imp.title} importURL={imp.url} onImport={toggleRefresh}/>))}
      </div>
      <BaseListTable key={refresh} caption='Liste des prix' endpoint='prices' columns={pricesColumns} />
    </>
  )
}

export default PricesList
