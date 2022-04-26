import React, {useState} from 'react'
const {PRODUCT, CREATE} = require('../../utils/consts')

const DataImport = require('../DataImport/DataImport')
const DialogBase = require('../Dialog/DialogBase')
const {PleasantButton} = require('./Button')

const {productsColumns} = require('./tablestructures')
const BaseListTable = require('./BaseListTable')

const ProductsList = ({accessRights}) => {

  const IMPORTS=[
    {title: 'Import articles', url: '/myAlfred/api/products/import'},
    {title: 'Import tarifs', url: '/myAlfred/api/products/import-price'},
    {title: 'Import stock', url: '/myAlfred/api/products/import-stock'},
  ]

  const [refresh, setRefresh]=useState(false)
  const [importInfo, setImportInfo]=useState(null)

  const toggleRefresh= () => setRefresh(!refresh)

  return (
    <>
      <div>
        { accessRights.isActionAllowed(PRODUCT, CREATE) && IMPORTS.map(imp => (
          <PleasantButton onClick={() => setImportInfo(imp)}>{imp.title}</PleasantButton>
        ))}
      </div>
      <BaseListTable caption='Liste des articles' endpoint='products' columns={productsColumns} />
      {importInfo &&
        <DialogBase open={true}>
          <DataImport title={importInfo.title} subTitle={importInfo.subTitle} importURL={importInfo.url}/>
        </DialogBase>
      }
    </>
  )
}

module.exports=ProductsList
