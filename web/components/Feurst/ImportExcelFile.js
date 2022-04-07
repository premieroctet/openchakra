import React from 'react'
import {PleasantButton} from './Button'

const ImportExcelFile = () => {
    

  return (<>
    <PleasantButton rounded={'full'} className="mb-4" bgColor={'#141953'} textColor={'white'} size="full-width">Importer un fichier Excel</PleasantButton>
    <a className='block text-lg no-underline text-center mb-6' href='#' download={true} >Télécharger le modèle de fichier</a>
  </>
  )
}

export default ImportExcelFile
