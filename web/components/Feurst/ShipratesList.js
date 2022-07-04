import React from 'react'

import {shipratesColumns} from './tablestructures'
import BaseListTable from './BaseListTable'

const ShipratesList = ({accessRights}) => {

  return (
    <>
      <BaseListTable caption='Frais de livraison' endpoint='shiprates' columns={shipratesColumns} accessRights={accessRights}/>
    </>
  )
}

module.exports=ShipratesList
