import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import {PleasantButton} from './Button'
const {
  MenuItem,
  Select,
  TextField,
  Typography,
} = require('@material-ui/core')
const lodash=require('lodash')
const axios = require('axios')
const {is_development} = require('../../config/config')
const {snackBarError} = require('../../utils/notifications')
const {guessDelimiter} = require('../../utils/text')
const {extractSample, getTabs, guessFileType} = require('../../utils/import')
const {TEXT_TYPE, XL_TYPE} = require('../../utils/feurst/consts')
const {setAxiosAuthentication} = require('../../utils/authentication')
const {client} = require('../../utils/client')
const {XL_EXTENSIONS}=require('../../utils/consts')

const PureDialog = dynamic(() => import('../Dialog//PureDialog'))

const DownloadExampleFile = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  width: 100%;
`

const ImportResult = ({result}) => {
  return (
    <>
      <div>Données créées : {result.created}</div>
      <div>Données mises à jour : {result.updated}</div>
      {!lodash.isEmpty(result.errors) &&
        <><h2>Erreurs:</h2>
          {result.errors.map(err => (<div>{err}</div>))}
        </>
      }
      {!lodash.isEmpty(result.warnings) &&
        <><h2>Warnings:</h2>
          {result.warnings.map(war => (<div>{war}</div>))}
        </>
      }
    </>
  )
}
const ImportExcelFile = ({importURL, templateURL, caption}) => {

  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [file, setFile]=useState(null)
  const [fileType, setFileType]=useState(null)
  const [rawData, setRawData]=useState(null)
  const [tabs, setTabs]=useState([])
  const [tab, setTab]=useState(null)
  const [sample, setSample] = useState(null)
  const [delimiter, setDelimiter] = useState(';')
  const [importResult, setImportResult] = useState(null)
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
    setFile(null)
  }, [])

  const getOptions = () => {
    const options={delimiter: delimiter, tab: tab, format: fileType, from_line: firstLine}
    return options
  }

  const readFile = file => {
    return new Promise((resolve, reject) => {
      let fr = new FileReader()
      fr.onload = () => {
        resolve(fr.result)
      }
      fr.onerror = reject
      fr.readAsBinaryString(file)
    })
  }

  useEffect(() => {
    extractSample(rawData, getOptions())
      .then(sample => setSample(sample))
      .catch(err => {
        console.error(err)
        setSample(null)
      })
  }, [rawData, fileType, tab, delimiter, firstLine])

  useEffect(() => {
    if (!fileType) { return }
    if (fileType==XL_TYPE) {
      getTabs(rawData)
        .then(tabs => {
          setTabs(tabs)
          setTab(tabs[0]||null)
        })
    }
    if (fileType==TEXT_TYPE) {
      setDelimiter(guessDelimiter(rawData))
    }
  }, [rawData, fileType])

  useEffect(() => {
    rawData && guessFileType(rawData)
      .then(fileType => setFileType(fileType))
  }, [rawData])

  useEffect(() => {
    file && readFile(file)
      .then(contents => setRawData(contents))
  }, [file])

  const onFileChange = event => {
    const f=event.target.files[0]
    setFile(f)
  }

  const submitData = () => {
    setImportResult(null)
    const data = new FormData()
    data.append('buffer', file)
    data.append('options', JSON.stringify(getOptions()))
    setAxiosAuthentication()
    axios.post(importURL, data)
      .then(result => {
        console.log(JSON.stringify(result))
        setImportResult(result.data)
      })
      .catch(err => {
        snackBarError(err)
      })
  }

  const cap = caption || 'Importer un fichier Excel'
  return (<>
    <PleasantButton onClick={() => setIsOpenDialog(true)} rounded={'full'} className="mb-4" bgColor={'#141953'} textColor={'white'} size="full-width">
      {cap}
    </PleasantButton>
    <PureDialog title={cap} open={isOpenDialog}
      onClose={() => setIsOpenDialog(false)}>
      {is_development() && <h1>{fileType},{delimiter},{tabs},{tab},{firstLine},</h1>}
      <input type={'file'} onSubmit={() => uploadFile} onChange={onFileChange} accept={XL_EXTENSIONS.join(',')}/>
      {sample &&
        <><div style={{display: 'flex'}}>
          {fileType==TEXT_TYPE &&
          <>
            <Typography>Séparateur:</Typography>
            <TextField maxLength={1} defaultValue={delimiter} id='delimiter'
              onChange={ev => !lodash.isEmpty(ev.target.value?.trim()) && setDelimiter(ev.target.value.trim())}
            />
          </>
          }
          {fileType==XL_TYPE &&
          <>
            <Typography>Onglet:</Typography>
            <Select outline='standard' value={tab} onChange={ev => setTab(ev.target.value)}>{tabs.map(t => (<MenuItem value={t}>{t}</MenuItem>))}</Select>
          </>
          }
          <Typography>1ère ligne:</Typography>
          <TextField type='number' defaultValue={firstLine} id='firstLine'
            onChange={ev => !isNaN(parseInt(ev.target.value)) && setFirstLine(parseInt(event.target.value))}
          />
        </div>
        <div style={{overflowX: 'auto', overflowY: 'auto'}}>
          <table border='1'>
            <thead><tr>{sample[0].map(h => (<th>{h}</th>))}</tr></thead>
            <tbody>{sample.slice(1, 5).map(r => (
              <tr>{r.map(v => <td>{v}</td>)}</tr>
            ))}</tbody>
          </table>
        </div>
        </>}
      {importResult && <ImportResult result={importResult}/>}
      <PleasantButton size={'full-width'} onClick={submitData}>Importer ce fichier</PleasantButton>
    </PureDialog>
    {templateURL &&
      <DownloadExampleFile type='button' className='block text-lg no-underline text-center mb-6' href='#' onClick={fetchTemplate} >
        Télécharger le modèle de fichier
      </DownloadExampleFile>
    }
  </>
  )
}

module.exports=ImportExcelFile
