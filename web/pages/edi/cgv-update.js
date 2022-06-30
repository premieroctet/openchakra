import React, {useState, useContext} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import withEdiAuth from '../../hoc/withEdiAuth'
import {API_PATH, BASEPATH_EDI, ACCOUNT, UPDATE_CGV} from '../../utils/consts'
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

           <span role={'img'} alt=''>⬇️</span>
            <span>Importer vos CGV actuelles</span> 
            <span className='italic'>(format .pdf)</span>
            <input className='sr-only' id='updatecgv' type={'file'} accept={'.pdf'} onChange={e => setFilename(e.target.files[0])} />

          </label>
          
          {filename && <p className='data'>{filename?.name || ''}</p>}
      
          <NormalButton disabled={!filename} size={'full-width'} rounded={'full'} type='submit' onSubmit={() => submitFile}>Mettre à jour les CGV</NormalButton>

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
    background-color: green;
    color: white;
  }

  label {
    display: flex;
    flex-direction: column;
    row-gap: var(--spc-2);
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-inline: auto;
    padding: var(--spc-8);
    aspect-ratio: 2 / 1;
    border: 1px solid var(--stone-400);
    cursor: pointer;
    margin-bottom: var(--spc-8);
    
    span:first-of-type {
      font-size: var(--text-4xl);
      background-color: var(--stone-100);
      padding: var(--spc-8);
      border-radius: var(--rounded-full);
      width: var(--spc-32);
      aspect-ratio: 1 / 1;
      display: flex;
      align-items: center;
      justify-content: center;
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
