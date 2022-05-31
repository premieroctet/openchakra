import React, {useState} from 'react'
import styled from 'styled-components'
import {getLoggedUser} from '../../../utils/context'
import {BASEPATH_EDI, API_PATH} from '../../../utils/consts'
import withEdiAuth from '../../../hoc/withEdiAuth'
import RenewPassword from '../../../components/Password/RenewPassword'
import {PleasantButton} from '../../../components/Feurst/Button'
import {client} from '../../../utils/client'

const Profile = () => {

  const loggedUser = getLoggedUser()
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


  return (<StyledProfile>
    <SideBar>
      <ul>
        <li>Mon compte</li>
      </ul>
    </SideBar>
       
    <Content>
      <h2>Nom</h2>
      {loggedUser?.name} {loggedUser?.firstname}

      <h2>Modification du mot de passe</h2>

      <form onSubmit={renewPassword}>
        <RenewPassword setPassword={setPassword} />
        <PleasantButton
          disabled={!canSubmitPassword}
          type='submit'
          onClick={() => renewPassword}
        >
            Enregistrer le mot de passe
        </PleasantButton>
      </form>

    </Content>
  </StyledProfile>)
}

const StyledProfile = styled.div`
  border-top: 1px solid var(--black);
  background-color: var(--stone-100);
  display: grid;
  column-gap: var(--spc-4);
  grid-template-columns: 10% 1fr;
  height: min(calc(100% - 2rem), 70vh);
  `

const SideBar = styled.aside`
  background-color: var(--brand-color);
  color: var(--white);
  border-top-right-radius: var(--rounded-2xl);
  border-bottom-right-radius: var(--rounded-2xl);
  box-shadow: 1px 0 2px 1px rgba(0, 0, 0, 0.2);
  width: calc(max-content - 1rem);
  
  ul {
    list-style-type: none;
    margin-left: var(--spc-3);
    padding: 0;
  }
    
  li {
    width: max-content;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
    padding: var(--spc-4);
    background-color: var(--white);
    color: var(--black);
    border-radius: var(--rounded-7xl);
  }

`

const Content = styled.div`
  margin-left: var(--spc-10);
`

export default withEdiAuth(Profile, {pathAfterFailure: `${BASEPATH_EDI}/login`})
