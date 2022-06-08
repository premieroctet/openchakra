import React, {useState} from 'react'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'
import {withTranslation} from 'react-i18next'
import Router from 'next/router'
import axios from 'axios'
import lodash from 'lodash'
import {RESET_PASSWORD} from '../../utils/i18n'
import {checkPass1, checkPass2} from '../../utils/passwords'
import withParams from '../../components/withParams'
import {ADMIN, MANAGER} from '../../utils/consts'
import {screen} from '../../styles/screenWidths'
import {snackBarSuccess, snackBarError} from '../../utils/notifications'
import RenewPassword from '../../components/Password/RenewPassword'
import {PleasantButton} from '../../components/Feurst/Button'
import EdiContainer from '../../components/Feurst/EdiContainer'

const ResetPassword = ({t, params}) => {

  const [password, setPassword] = useState('')
  const [passChanged, setPassChanged] = useState(false)
  const canSubmitPassword = !!(password?.check1 && password?.check2)

  const renewPassword = async e => {
    e.preventDefault()

    return await client(`${API_PATH}/users/profile/editPassword`, {data: {newPassword: password.newPassword}, method: 'PUT'})
      .then(() => {
        setPassword(null)
        setPassChanged(!passChanged)
      })
      .catch(err => console.error(err))
  }

  const onSubmit = e => {
    e.preventDefault()
    const data = {
      password,
      token: params.token,
    }
    axios.post('/myAlfred/api/users/resetPassword', data)
      .then(res => {
        const user = res.data
        snackBarSuccess(ReactHtmlParser(this.props.t('RESET_PASSWORD.password_update')))
        // Rediriger vers /particular ou /professional suivant les rôles
        if (lodash.intersection(user.roles, [ADMIN, MANAGER]).length>0) {
          localStorage.setItem('b2b', 'true')
        }
        else {
          localStorage.removeItem('b2b')
        }
        Router.push({pathname: '/'})
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data.msg)
      })
  }
  

  return (
    <EdiContainer>
    
      <StyledReset>
        <h2>{ReactHtmlParser(t('RESET_PASSWORD.title'))}</h2>
      
        <form onSubmit={renewPassword}>
          
          <RenewPassword passChanged={passChanged} setPassword={setPassword} />
        
          <PleasantButton
            rounded={'full'}
            disabled={!canSubmitPassword}
            type='submit'
            onClick={() => renewPassword}
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
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  
  h2 {
    color: var(--black);
    font-size: var(--text-2xl);
  }

  form {
    display: flex; 
    flex-direction: column;
    width: min(calc(100% - 2rem), 40rem);
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
