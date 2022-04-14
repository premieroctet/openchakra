import React, {useState} from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import {client} from '../../utils/client'
import {API_PATH} from '../../utils/consts'
import {snackBarError} from '../../utils/notifications'
import {PleasantButton} from './Button'

const PureDialog = dynamic(() => import('../Dialog//PureDialog'))

const DownloadExampleFile = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  width: 100%;
`

const ImportExcelFile = () => {
  
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  const uploadFile = () => {
    // TODO
  }

  const fetchTemplate = async() => {
    const exampleFile = await client(`${API_PATH}/orders/template`)
      .catch(e => {
        console.error(e)
        snackBarError('Téléchargement échoué')
      })

    if (exampleFile) {
      let url = URL.createObjectURL(exampleFile)
      let a = document.createElement('a')
      a.href = url
      a.download = 'FeurstExample.xlsx'
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
  }

  return (<>
    <PleasantButton onClick={() => setIsOpenDialog(true)} rounded={'full'} className="mb-4" bgColor={'#141953'} textColor={'white'} size="full-width">Importer un fichier Excel</PleasantButton>
    <PureDialog title="Importer un fichier Excel" open={isOpenDialog}
      onClose={() => setIsOpenDialog(false)}>
      <input type={'file'} onSubmit={() => uploadFile} />
      <PleasantButton size={'full-width'}>Importer ce fichier</PleasantButton>
    </PureDialog>
    <DownloadExampleFile type='button' className='block text-lg no-underline text-center mb-6' href='#' onClick={fetchTemplate} >Télécharger le modèle de fichier</DownloadExampleFile>
  </>
  )
}

export default ImportExcelFile
