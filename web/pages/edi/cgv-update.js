import React, {useState, useContext} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import withEdiAuth from '../../hoc/withEdiAuth'
import {API_PATH, BASEPATH_EDI, ACCOUNT, UPDATE_CGV} from '../../utils/consts'
import {setAxiosAuthentication} from '../../utils/authentication'

const CGVupdate = () => {

  const [filename, setFilename] = useState('')
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
        console.log(res)
        return res?.data
      })
      .catch(err => console.error(err))
  }

  return (<div className='container-md mb-8'>
    <h1>Mise à jour des CGV</h1>
    <UpdateFile onSubmit={submitFile}>
      <ol>
        <li>
          <label htmlFor='updatecgv'>
            <span className='button'>Ajouter</span> les nouvelles CGV <span className='italic'>(format .pdf)</span>
            <input className='sr-only' id='updatecgv' type={'file'} accept={'.pdf'} onChange={e => setFilename(e.target.files[0])} />

            <span className='data'>{filename?.name || 'non renseigné'}</span>

          </label>
        </li>

        <li>
          <button type='submit' onSubmit={() => submitFile}>Mettre à jour les CGV</button>
        </li>

      </ol>
    </UpdateFile>
  </div>
  )
}

const UpdateFile = styled.form`

  /* background-color: var(--yellow-500); */
  padding: var(--spc-4);
  border-radius: var(--rounded-md);

  li {
    font-size: var(--text-lg);
    line-height: 3;
    margin-bottom: var(--spc-4);
  }


  button, .button {
    min-width: 10ch;
    padding: var(--spc-4);
    background-color: var(--white);
    border: 1px solid var(--brand-color);
    margin-inline: var(--spc-2);
    margin-block: var(--spc-4);
    border-radius: var(--rounded-2xl);
  }

  .data {
    margin-inline-start: var(--spc-2);
    border-bottom: 1px solid var(--brand-color);
    background-color: var(--white);
  }
`

export default withEdiAuth(CGVupdate, {model: ACCOUNT, action: UPDATE_CGV, pathAfterFailure: `${BASEPATH_EDI}/login`})
