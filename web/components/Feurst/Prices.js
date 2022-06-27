import React from 'react'

import {pricesColumns} from './tablestructures'
import BaseListTable from './BaseListTable'

const PricesList = ({accessRights}) => {

  return (
    <>
      <BaseListTable key={refresh} caption='Liste des prix' endpoint='prices' columns={pricesColumns} accessRights={accessRights}/>
    </>
  )
}

export default PricesList
