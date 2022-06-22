import React, {useState, useContext} from 'react'
import {useRouter} from 'next/router'
import styled from 'styled-components'
import {screen} from '../../styles/screenWidths'
import {BASEPATH_EDI, API_PATH, FEURST_IMG_PATH} from '../../utils/feurst/consts'
import {client} from '../../utils/client'
import EdiContainer from '../../components/Feurst/EdiContainer'
import {UserContext} from '../../contextes/user.context'
import {snackBarSuccess, snackBarError} from '../../utils/notifications'

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
    <EdiContainer>
      <div />
      <StyledCGV>
        <div className='container-xl'>
          <h1>Conditions générales de vente</h1>

          <div className='displaycgv'>
            <embed src={`${FEURST_IMG_PATH}/configurateur.pdf`} type="application/pdf" width="100%" height="100%" />
          
            {user && !user?.cgv_valid ? <>
            
              <form onSubmit={acceptCGV}>
              
                <label htmlFor='cgvcheck'>
                  <input id="cgvcheck" type={'checkbox'} value={cgvCheck} onChange={() => setCgvCheck(!cgvCheck)} />
                  J'ai pris connaissance des conditions générales de vente.
                </label>

                <button type="submit" onClick={acceptCGV}>J'accepte sans réserve les conditions générales de vente</button>
              </form>
            </>
              : null}

          </div>

        </div>
      </StyledCGV>
    </EdiContainer>
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

  embed {
    grid-area: cgvdoc;
    min-height: 50vh;
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
  }
`

export default CGV
