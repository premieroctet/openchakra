import React, {useState} from 'react'
import {SHIPRATE, CREATE} from '../../utils/consts'

import DataImport from '../DataImport/DataImport'
import DialogBase from '../Dialog/DialogBase'
import {NormalButton} from './Button'

import {shipratesColumns} from './tablestructures'
import BaseListTable from './BaseListTable'

const ShipratesList = ({accessRights}) => {

  const IMPORTS=[
    {title: 'Import', url: '/myAlfred/api/shiprates/import'},
  ]

  const [refresh, setRefresh]=useState(false)
  const [importInfo, setImportInfo]=useState(null)

  const toggleRefresh= () => setRefresh(!refresh)

  return (
    <>
      <div>
        { accessRights.isActionAllowed(SHIPRATE, CREATE) && IMPORTS.map((imp, i) => (
          <NormalButton key={`action${i}`} onClick={() => setImportInfo(imp)}>{imp.title}</NormalButton>
        ))}
      </div>
      <BaseListTable caption='Frais de livraison' endpoint='shiprates' columns={shipratesColumns} accessRights={accessRights}/>
      {importInfo &&
        <DialogBase open={true}>
          <DataImport title={importInfo.title} subTitle={importInfo.subTitle} importURL={importInfo.url}/>
        </DialogBase>
      }
    </>
  )
}

module.exports=ShipratesList
