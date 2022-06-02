import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {FEURST_ICON_PATH, BASEPATH_EDI, API_PATH} from '../../../utils/consts'
import withEdiAuth from '../../../hoc/withEdiAuth'
import RenewPassword from '../../../components/Password/RenewPassword'
import {PleasantButton} from '../../../components/Feurst/Button'
import {client} from '../../../utils/client'
const {ACCOUNT, UPDATE} = require('../../../utils/feurst/consts')

const Profile = () => {

  const [profile, setProfile] = useState()
  const [password, setPassword] = useState('')
  const canSubmitPassword = !!(password?.check1 && password?.check2)

  const renewPassword = async e => {
    e.preventDefault()

    return await client(`${API_PATH}/users/profile/editPassword`, {data: {newPassword: password.newPassword}, method: 'PUT'})
      .then(res => {
        console.log(res)
        setPassword({})
      })
      .catch(err => console.error(err))
  }

  const getUserInfo = async() => {
    return await client(`${API_PATH}/users/current`)
      .then(res => {
        setProfile(res)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getUserInfo()
  }, [])


  return (<StyledProfile>

    {/* <h2><img width={30} height={30} src={`${FEURST_ICON_PATH }/user.icon.svg`} alt="" /><span className='underlined'>Mon profil</span></h2> */}
    <h3>Nom</h3>
    <p>{profile?.full_name}</p>
   
    <h3>Société</h3>
    <p>{profile?.company.full_name}</p>

    <h3>Email</h3>
    <p>{profile?.email}</p>
    

    <h3>Modification du mot de passe</h3>

    <form onSubmit={renewPassword}>
      <RenewPassword setPassword={setPassword} />
      <PleasantButton
        rounded={'full'}
        disabled={!canSubmitPassword}
        type='submit'
        onClick={() => renewPassword}
      >
            Enregistrer le mot de passe
      </PleasantButton>
    </form>

    
  </StyledProfile>)
}

const StyledProfile = styled.div`

  border-top: 1px solid var(--black);
  height: min(calc(100% - 2rem), 70vh);

  h2, h3 {
    color: var(--black);
  }

  h2 {
    display: inline-flex;
    column-gap: var(--spc-2);
    font-size: var(--text-2xl);
  }

  p {
    font-size: var(--text-lg);
  }

  .underlined {
    border-bottom: 10px solid var(--brand-color);
  }
  
  h3 {
    font-size: var(--text-2xl);
    color: var(--black);
    margin-bottom: 0;
  }

  form {
    display: flex; 
    flex-direction: column;
    width: min(calc(100% - 2rem), 40vw);

    & > div {
      margin-bottom: var(--spc-4);
    }
  }

  button[type="submit"] {
    align-self: flex-end;
  }

  em {
    margin-bottom: var(--spc-4);
  }

  `


export default withEdiAuth(Profile, {model: ACCOUNT, action: UPDATE, pathAfterFailure: `${BASEPATH_EDI}/login`})
