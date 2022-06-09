import React, {useState} from 'react'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'
import {withTranslation} from 'react-i18next'
import {useRouter} from 'next/router'
import {API_PATH} from '../../utils/consts'
import {client} from '../../utils/client'
import withParams from '../../components/withParams'
import {snackBarSuccess, snackBarError} from '../../utils/notifications'
import RenewPassword from '../../components/Password/RenewPassword'
import {PleasantButton} from '../../components/Feurst/Button'
import EdiContainer from '../../components/Feurst/EdiContainer'

const ResetPassword = ({t, params}) => {

  const [password, setPassword] = useState('')
  const [passChanged, setPassChanged] = useState(false)
  const canSubmitPassword = !!(password?.check1 && password?.check2)
  const router = useRouter()

  const resetPassword = async e => {
    e.preventDefault()
    
    const data = {
      password: password.newPassword,
      token: params.token,
    }

    console.log(data)
    
    return await client(`${API_PATH}/users/resetPassword`, {data})
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('RESET_PASSWORD.password_update')))
        router.push({pathname: '/'})
      })
      .catch(err => {
        console.error(err)
        snackBarError(err?.info.message)
      })
  }
  

  return (
    <EdiContainer>
      <div />
      <StyledReset>
        <h2>{ReactHtmlParser(t('RESET_PASSWORD.title'))}</h2>
      
        <form onSubmit={resetPassword}>
          
          <RenewPassword passChanged={passChanged} setPassword={setPassword} />
        
          <PleasantButton
            rounded={'full'}
            disabled={!canSubmitPassword}
            type='submit'
            onClick={() => resetPassword}
          >
            Enregistrer le nouveau mot de passe
          </PleasantButton>
        </form>

      </StyledReset>
    
    </EdiContainer>
  )
}

const StyledReset = styled.div`

  padding-top: var(--spc-4);
  border-top: 1px solid var(--black);
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-template-columns: 1fr;
  
  h2 {
    color: var(--black);
    font-size: var(--text-2xl);
  }

  form {
    display: flex; 
    flex-direction: column;
    width: min(calc(100% - 2rem), 30rem);
    margin-bottom: var(--spc-10);

    & > div {
      margin-bottom: var(--spc-4);
    }
  }
  
  button[type="submit"] {
    align-self: flex-end;
    margin-block: var(--spc-4);
  }

  em {
    margin-bottom: var(--spc-4);
  }
`

export default withTranslation('custom', {withRef: true})(withParams(ResetPassword))
