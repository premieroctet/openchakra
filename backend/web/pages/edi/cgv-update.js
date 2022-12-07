import React, {useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {API_PATH} from '../../utils/consts'
import {ACCOUNT, BASEPATH_EDI, UPDATE_CGV} from '../../utils/feurst/consts'
import withEdiAuth from '../../hoc/withEdiAuth'
import {setAxiosAuthentication} from '../../utils/authentication'
import {NormalButton} from '../../components/Feurst/Button'

const CGVupdate = () => {

  const [filename, setFilename] = useState('')
  const [cgvUploaded, setCgvUploaded] = useState(false)
  const importURL = `${API_PATH}/users/update-cgv`

  const submitFile = async e => {
    e.preventDefault()

    if (!filename) {
      return
    }

    const data = new FormData()
    data.append('buffer', filename)

    setAxiosAuthentication()
    return await axios.post(importURL, data)
      .then(res => {
        setCgvUploaded(true)
        setFilename('')
        return res?.data
      })
      .catch(err => console.error(err))
  }

  return (<div className='container-md mb-8'>
    <h1>Mise à jour des CGV</h1>

    <UpdateFile onSubmit={submitFile}>

      {cgvUploaded && <p className='success'>Les nouvelles conditions générales ont été mises en place.</p>}

      <label htmlFor='updatecgv'>

        <span role={'img'} alt=''>⬇</span>
        <span>Importer les nouvelles CGV</span>
        <span className='italic'>(format .pdf)</span>
        <input className='sr-only' id='updatecgv' type={'file'} accept={'.pdf'} onChange={e => setFilename(e.target.files[0])} />

      </label>

      {filename && <p className='data'>{filename?.name || ''}</p>}

      <NormalButton disabled={!filename} size={'full-width'} rounded={'full'} type='submit' onSubmit={submitFile}>Mettre à jour les CGV</NormalButton>

      <p className='text-center'>La mise à jour des CGV impliquera une nouvelle acceptation des CGV pour l'ensemble des comptes.</p>

    </UpdateFile>
  </div>
  )
}

const UpdateFile = styled.form`

  padding: var(--spc-4);
  border-radius: var(--rounded-md);
  font-size: var(--text-lg);

  .success {
    padding: var(--spc-4);
    background-color: var(--brand-color);
    color: white;
  }

  label {
    display: flex;
    flex-direction: column;
    row-gap: var(--spc-2);
    justify-content: center;
    align-items: center;
    width: min(calc(100% - 2rem), 30rem);
    margin-inline: auto;
    padding: var(--spc-8);
    border: 1px solid var(--stone-400);
    cursor: pointer;
    margin-bottom: var(--spc-8);
    text-align: center;

    span:first-of-type {
      color: var(--brand-color);
      font-size: var(--text-5xl);
      background-color: var(--stone-100);
      padding: var(--spc-8);
      border-radius: var(--rounded-full);
      width: min(calc(100% - 2rem), var(--spc-24));
      aspect-ratio: 1 / 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover, &:focus-within {
      border-style: dashed;
    }

  }

  .data {
    padding-block: var(--spc-4);
    margin-inline: auto;
    margin-bottom: var(--spc-4);
    text-align: center;
  }
`

export default withEdiAuth(CGVupdate, {model: ACCOUNT, action: UPDATE_CGV, pathAfterFailure: `${BASEPATH_EDI}/login`})
