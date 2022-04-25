import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import {API_PATH} from '../../utils/consts'
import {PleasantButton} from './Button'
const {FormControl, TextField} = require('@material-ui/core')
const lodash=require('lodash')
const axios = require('axios')
const csv_parse = require('csv-parse/lib/sync')
const {setAxiosAuthentication} = require('../../utils/authentication')
const {client} = require('../../utils/client')
const {snackBarError, snackBarSuccess} = require('../../utils/notifications')
const {guessSeparator} = require('../../utils/text')

const PureDialog = dynamic(() => import('../Dialog//PureDialog'))

const DownloadExampleFile = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  width: 100%;
`

const ImportExcelFile = ({importURL, templateURL}) => {

  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [file, setFile]=useState(null)
  const [rawData, setRawData]=useState(null)
  const [sample, setSample] = useState(null)
  const [separator, setSeparator] = useState(';')
  // WARNING: first is 1, not 0
  const [firstLine, setFirstLine] = useState(1)
  const uploadFile = () => {
    // TODO
  }

  const fetchTemplate = async() => {
    const exampleFile = await client(templateURL)
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

  useEffect(() => {
    if (rawData) {
      try {
        setSample(csv_parse(rawData, {delimiter: separator, from_line: firstLine}))
      }
      catch(e) {
        console.error(e)
      }
    }
  }, [rawData, separator, firstLine])

  const onFileChange = event => {
    const f=event.target.files[0]
    setFile(f)
    const url=URL.createObjectURL(f)
    axios.get(url)
      .then(res => {
        setRawData(res.data)
        setSeparator(guessSeparator(res.data))
      })
      .catch(err => {
        snackBarError(err)
      })
  }

  const submitData = () => {
    const data = new FormData()
    data.append('buffer', file)
    setAxiosAuthentication()
    axios.post(importURL, data)
      .then(result => {
        snackBarSuccess(result)
      })
      .catch(err => {
        snackBarError(err)
      })
  }

  return (<>
    <PleasantButton onClick={() => setIsOpenDialog(true)} rounded={'full'} className="mb-4" bgColor={'#141953'} textColor={'white'} size="full-width">Importer un fichier Excel</PleasantButton>
    <PureDialog title="Importer un fichier Excel" open={isOpenDialog}
      onClose={() => setIsOpenDialog(false)}>
      <input type={'file'} onSubmit={() => uploadFile} onChange={onFileChange} accept='.csv'/>
      {sample &&
        <>
          <FormControl variant="standard">
            <label htmlFor='separator'>Séparateur:</label>
            <TextField maxLength={1} defaultValue={separator} id='separator'
              onChange={ev => !lodash.isEmpty(ev.target.value?.trim()) && setSeparator(ev.target.value.trim())}
            />
          </FormControl>
          <FormControl variant="standard">
            <label htmlFor='firstLine'>Commencer en ligne:</label>
            <TextField type='number' defaultValue={firstLine} id='firstLine'
              onChange={ev => !isNaN(parseInt(ev.target.value)) && setFirstLine(parseInt(event.target.value))}
            /></FormControl>
          <table border='1'>
            <tr>{sample[0].map(h => (<th>{h}</th>))}</tr>
            {sample.slice(1, 5).map(r => (
              <tr>{r.map(v => <td>{v}</td>)}</tr>
            ))}
          </table>
        </>}
      <PleasantButton size={'full-width'} onClick={submitData}>Importer ce fichier</PleasantButton>
    </PureDialog>
    <DownloadExampleFile type='button' className='block text-lg no-underline text-center mb-6' href='#' onClick={fetchTemplate} >Télécharger le modèle de fichier</DownloadExampleFile>
  </>
  )
}

export default ImportExcelFile
