import React, {useState} from 'react'
const {SHIPRATE, CREATE} = require('../../utils/consts')

const DataImport = require('../DataImport/DataImport')
const DialogBase = require('../Dialog/DialogBase')
const {PleasantButton} = require('./Button')

const {shipratesColumns} = require('./tablestructures')
const BaseListTable = require('./BaseListTable')

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
          <PleasantButton key={`action${i}`} onClick={() => setImportInfo(imp)}>{imp.title}</PleasantButton>
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
