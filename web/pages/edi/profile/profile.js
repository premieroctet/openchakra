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
    <div>
      <h2>A propos de vous</h2>

      <div className='leftborder-blue'>
        
        <div className='flex gap-x-2'>
          <div>
            <h3>Prénom&nbsp;:</h3>
            <p>{profile?.firstname}</p>
          </div>
   
          <div>
            <h3>Nom&nbsp;:</h3>
            <p>{profile?.name}</p>

          </div>

        </div>

        <div>
          <h3>Email professionel&nbsp;:</h3>
          <p>{profile?.email}</p>
        </div>
        <div>
          <h3>Société&nbsp;:</h3>
          <p>{profile?.company?.full_name}</p>
        </div>
      </div>
  
    </div>
    

    <div>
      <h2>Modification du mot de passe</h2>

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

    </div>

    
  </StyledProfile>)
}

const StyledProfile = styled.div`

  padding-top: var(--spc-4);
  border-top: 1px solid var(--black);
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .leftborder-blue {
    border-left: var(--spc-4) solid var(--brand-color);
    padding-left: var(--spc-4);

    h3, p {
      display: inline-block;
      margin-right: var(--spc-3);
      font-weight: var(--font-medium);
    }
  }
  
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
  
  h3 {
    font-size: var(--text-lg);
    color: var(--black);
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
