import React, {useState, useContext} from 'react'
import {useRouter} from 'next/router'
import styled from 'styled-components'
import withEdiAuth from '../../hoc/withEdiAuth'
import {API_PATH} from '../../utils/consts'
import {BASEPATH_EDI} from '../../utils/consts'
import {client} from '../../utils/client'
import {UserContext} from '../../contextes/user.context'
import {snackBarSuccess, snackBarError} from '../../utils/notifications'
const {CGV_PATH} = require('../../config/config')

const CGV = () => {

  const {user} = useContext(UserContext)
  const [cgvCheck, setCgvCheck] = useState(false)
  const router = useRouter()

  const acceptCGV = async e => {
    e.preventDefault()

    if (cgvCheck) {
      return await client(`${API_PATH}/users/validate-cgv`, {method: 'PUT'})
        .then(() => {
          snackBarSuccess('CGV acceptées')
          router.push(BASEPATH_EDI)
        })
        .catch(e => {
          snackBarError('CGV non acceptées')
          console.error(e)
        })
    }
  }


  return (

    <StyledCGV>
      <div className='container-xl'>
        <h1>Conditions générales de vente</h1>

        {user && !user?.cgv_valid &&
          <p>Il est nécessaire de prendre connaissance des conditions générales de vente, et de les accepter pour utiliser ce service.</p>
        }

        <div className='displaycgv'>
          <object
            type="application/pdf"
            data={CGV_PATH}
            role={'document'}
            width="300"
            height="200"
          ></object>

          {user && !user?.cgv_valid ? <>

            <form onSubmit={acceptCGV}>

              <label htmlFor='cgvcheck'>
                <input id="cgvcheck" type={'checkbox'} value={cgvCheck} onChange={() => setCgvCheck(!cgvCheck)} />
                  J'ai pris connaissance des conditions générales de vente.
              </label>

              <button type="submit" onClick={() => acceptCGV} disabled={!cgvCheck}>J'accepte sans réserve les conditions générales de vente</button>
            </form>
          </>
            : null}

        </div>

      </div>
    </StyledCGV>

  )

}

const StyledCGV = styled.div`

  h1 {
    color: var(--black);
    font-size: var(--text-3xl);
  }

  .displaycgv {
    display: grid;
    column-gap: var(--spc-2);
    row-gap: var(--spc-4);
    grid-template-areas: 'cgvdoc' 'cgvaccept';
    grid-template-columns: 1fr;
  }

  object {
    grid-area: cgvdoc;
    min-height: 50vh;
    width: 100%;
  }

  form {
    grid-area: cgvaccept;
    width: min(calc(100% - 2rem), 35rem);
    margin-inline: auto;
    padding: var(--spc-8);
    font-size: var(--text-base);
    color: var(--black);
    align-self: center;
    border: 1px solid var(--brand-color);
    border-radius: var(--spc-3);
    margin-block-start: var(--spc-4);
    margin-block-end: var(--spc-18);

  }

  label {
    color: var(--black);
    font-size: var(--text-lg);
    display: block;
    margin-block-end: var(--spc-6);
  }

  input {
    accent-color: var(--brand-color);
    width: var(--text-lg);
    aspect-ratio: 1 / 1;
    padding-inline: var(--spc-2);
  }

  button {
    font-size: var(--text-lg);
    cursor: pointer;
    background-color: var(--brand-color);
    color: var(--white);
    padding: var(--spc-4) var(--spc-2);
    border: 0;
    border-radius: var(--spc-2);
    width: 100%;
    transition: background-color ease-in .3s;
  }

  button:disabled {
    background-color: var(--gray-800);
  }
`

export default withEdiAuth(CGV, {force: true})
