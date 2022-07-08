import React, {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import {
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import {is_development} from '../../config/config'
import {snackBarError} from '../../utils/notifications'
import {guessDelimiter} from '../../utils/text'
import {extractSample, getTabs, guessFileType} from '../../utils/import'
import {FEURST_IMG_PATH, TEXT_TYPE, XL_TYPE} from '../../utils/feurst/consts'
import {XL_EXTENSIONS} from '../../utils/consts'
import {simulateDownload} from '../utils/simulateDownload'
import {NormalButton} from './Button'
import ImportResult from './ImportResult'

const PureDialog = dynamic(() => import('../Dialog//PureDialog'))


const ImportExcelFile = ({importURL, templateURL, caption, endpoint, orderid, importFile}) => {

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


  useEffect(() => {
    setFile(null)
  }, [])

  const getOptions = useCallback(() => {
    const options={delimiter: delimiter, tab: tab, format: fileType, from_line: firstLine}
    return options
  }, [delimiter, tab, fileType, firstLine])

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
  }, [rawData, fileType, tab, delimiter, firstLine, getOptions])

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
      const delim=guessDelimiter(rawData)
      setDelimiter(delim)
    }
  }, [rawData, fileType])

  useEffect(() => {
    rawData && guessFileType(rawData)
      .then(fileType => {
        setFileType(fileType)
      })
  }, [rawData])

  useEffect(() => {
    file && readFile(file)
      .then(contents => {
        setImportResult(null)
        setRawData(contents)
      })
  }, [file])

  const onFileChange = event => {
    const f=event.target.files[0]
    setFile(f)
  }

  const submitData = async({endpoint, orderid, importFile}) => {

    setImportResult(null)
    const data = new FormData()
    data.append('buffer', file)
    data.append('options', JSON.stringify(getOptions()))
    await importFile({endpoint, orderid, importURL, data})
      .then(result => {
        setIsOpenDialog(false)
        setImportResult(result)
      })
      .catch(err => {
        snackBarError(err)
      })
  }

  const cap = caption || 'Importer un fichier Excel'

  return (<>
    <NormalButton onClick={() => setIsOpenDialog(true)} rounded={'full'} className="mb-4" bgColor={'#141953'} textColor={'white'} size="full-width">
      {cap}
    </NormalButton>
    <ImportDialog open={isOpenDialog}
      onClose={() => setIsOpenDialog(false)} height='90%'>
      {/* {is_development() && <h1>{fileType},{delimiter},{tabs},{tab},{firstLine},</h1>} */}

      {/* Design modal */}
      <h2>{cap}</h2>

      <label htmlFor='importfile'>
        <div className='box'>
          <img width={'171'} src={`${FEURST_IMG_PATH}/xls-icon.png`} alt=""/>
          <span className='inputfiletext'>Parcourir…</span>
          <input
            className='sr-only'
            id={'importfile'}
            type={'file'}
            onChange={onFileChange}
            accept={XL_EXTENSIONS.join(',')}
          />
        </div>
      </label>

      {sample && !importResult &&
        <><div style={{display: 'flex'}}>
          {fileType==TEXT_TYPE &&
          <>
            <Typography>Séparateur:</Typography>
            <TextField maxLength={1} defaultValue={delimiter} id='delimiter'
              onChange={ev => !isEmpty(ev.target.value?.trim()) && setDelimiter(ev.target.value.trim())}
            />
          </>
          }
          {fileType==XL_TYPE &&
          <>
            <Typography>Onglet:</Typography>
            <Select
              outline='standard'
              value={tab}
              onChange={ev => setTab(ev.target.value)}
            >
              {tabs.map((t, i) => (<MenuItem key={`men${i}`} value={t}>{t}</MenuItem>))}
            </Select>
          </>
          }
          <Typography>1ère ligne:</Typography>
          <TextField type='number' defaultValue={firstLine} id='firstLine'
            onChange={ev => !isNaN(parseInt(ev.target.value)) && setFirstLine(parseInt(ev.target.value))}
          />
        </div>
        <div style={{overflowX: 'auto', overflowY: 'auto'}}>
          <table border='1'>
            <thead><tr>{sample[0].map((h, i) => (<th key={`head${i}`}>{String(h).slice(0, 10)}</th>))}</tr></thead>
            <tbody>{sample.slice(1, 5).map((r, i) => (
              <tr key={`line${i}`}>{r.map((v, j) => <td key={`cell${i}${j}`} >{String(v).slice(0, 10)}</td>)}</tr>
            ))}</tbody>
          </table>
        </div>
        </>}

      <div className='importbutton flex'>
        <NormalButton size={'full-width'} rounded={'full'} onClick={() => submitData({endpoint, orderid, importFile})}>Importer</NormalButton>
      </div>
    </ImportDialog>
    {templateURL &&
      <DownloadExampleFile type='button' className='block text-lg no-underline text-center mb-6' onClick={() => simulateDownload({url: templateURL, filename: 'FeurstExample.xlsx'})} >
        Télécharger le modèle de fichier
      </DownloadExampleFile>
    }
    {importResult && <ImportResult result={importResult}/>}
  </>
  )
}

const DownloadExampleFile = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  width: 100%;
`

const ImportDialog = styled(PureDialog)`


  .dialogcontent {
    aspect-ratio: 1 / 1;
    max-width: 25rem;
  }

  h2 {
    color: var(--black);
    text-align: center;
  }

  .box {
    aspect-ratio: 1 / 1;
    background-color: #e4e4e4;
    width: min(calc(100% - 2rem), calc(100% - 5rem));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-inline: auto;
    margin-bottom: var(--spc-6);

    img {
      margin-bottom: var(--spc-2);
      aspect-ratio: 1 / 1;
      width: 6rem;
    }
  }

  label {
    cursor: pointer;
  }

  .inputfiletext {
    background-color: var(--white);
    padding: var(--spc-2) var(--spc-5);
    text-align: center;
    border-radius: var(--rounded-2xl);
    width: min(calc(100% - 2rem), calc(100% - 5rem));
  }

  .importbutton {
    justify-content: center;
    button {width: 80%;}
  }


`

export default ImportExcelFile
