import React, {useCallback, useState, useEffect} from 'react'
import {withTranslation} from 'react-i18next'
import UploadIcon from '@icons/material/UploadIcon'
import {API_PATH} from '../../utils/consts'
import {
  BASEPATH_EDI,
  CREATE,
  DELETE,
  EXPORT,
  IMPORT,
  UPDATE,
} from '../../utils/feurst/consts'
import withEdiRequest from '../../hoc/withEdiRequest'
import FeurstTable from '../../styles/feurst/FeurstTable'
import ImportExcelFile from './ImportExcelFile'
import {PleasantLink} from './Button'


const BaseListTable = ({
  t,
  accessRights,
  endpoint,
  columns,
  refresh,
  caption,
  getList,
  deleteOrder,
  updateEmail,
  state,
  filter,
  filtered,
  updateSeller,
  deleteUser,
  sellers,
  importFile,
  wordingSection = null,
  ...props
}) => {

  const [language, setLanguage] = useState('fr')
  const [openImport, setOpenImport] = useState(false)

  const onImportClose = useCallback(() => {
    setOpenImport(-false)
  })

  const canUpdateSeller = accessRights.isActionAllowed(accessRights.getModel(), UPDATE)
  const canCreate = accessRights.isActionAllowed(accessRights.getModel(), CREATE) && wordingSection !== null
  const canDelete = accessRights.isActionAllowed(accessRights.getModel(), DELETE)
  const canExportXls = accessRights.isActionAllowed(accessRights.getModel(), EXPORT)

  // Init language and order
  useEffect(() => {
    setLanguage(Navigator.language)
  }, [language])

  // Init table
  useEffect(() => {
    getList({endpoint, filter})
  }, [endpoint, getList, filter, refresh])

  const cols= columns(
    {
      language,
      endpoint,
      deleteOrder: canDelete? deleteOrder:null,
      deleteUser,
      updateSeller: canUpdateSeller ? updateSeller : null,
      exportFile: canExportXls,
      updateEmail,
      sellers,
    })

  const canImport=accessRights.isActionAllowed(accessRights.getModel(), IMPORT)
  const importURL=canImport && `${API_PATH}/${endpoint}/import`
  const tableCaption=canImport ?
    <>
      <span>{caption}</span>
      <span title='Importer un fichier Excel'><UploadIcon onClick={() => setOpenImport(true)}/></span>
    </>
    : caption

  return (<>
    {canCreate &&
    <div className='container-md mb-8'>
      <PleasantLink rounded={'full'} href={`${BASEPATH_EDI}/${endpoint}/create`}>
        <span>⊕</span> {t(`${wordingSection}.create`)}
      </PleasantLink>
    </div>
    }

    {canImport && <ImportExcelFile hideButton={true}
      openDialog={openImport} endpoint={endpoint} importURL={importURL} importFile={importFile}
      onDialogClose={onImportClose} />}

    <FeurstTable
      caption={tableCaption}
      data={state.orders}
      columns={cols}
      filter={filter}
      filtered={filtered}
      pagination={true}
      {...props}
    />
  </>
  )
}

export default withTranslation(null, {withRef: true})(withEdiRequest(BaseListTable))
