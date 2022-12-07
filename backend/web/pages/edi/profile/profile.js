import React, {useState} from 'react'
import styled from 'styled-components'
import {
  ACCOUNT,
  BASEPATH_EDI,
  FEURST_ICON_PATH,
  UPDATE,
} from '../../../utils/feurst/consts'
import {API_PATH} from '../../../utils/consts'
import withEdiAuth from '../../../hoc/withEdiAuth'
import RenewPassword from '../../../components/Password/RenewPassword'
import {NormalButton} from '../../../components/Feurst/Button'
import {client} from '../../../utils/client'
import {screen} from '../../../styles/screenWidths'
import {useUserContext} from '../../../contextes/user.context'


const Profile = () => {

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

  const {user} = useUserContext()


  return (<StyledProfile>

    <div>
      <h2><img width={30} height={30} src={`${FEURST_ICON_PATH }/user.icon.svg`} alt="" />A propos de vous</h2>

      <div className='leftborder-blue'>

        <div className='flex gap-x-2'>
          <div>
            <h3>Prénom&nbsp;:</h3>
            <p>{user?.firstname}</p>
          </div>

          <div>
            <h3>Nom&nbsp;:</h3>
            <p>{user?.name}</p>

          </div>

        </div>

        <div>
          <h3>Email professionnel&nbsp;:</h3>
          <p>{user?.email}</p>
        </div>
        <div>
          <h3>Société&nbsp;:</h3>
          <p>{user?.company?.full_name}</p>
        </div>
      </div>

    </div>


    <div>
      <h2>Modification du mot de passe</h2>

      <form onSubmit={renewPassword}>
        <RenewPassword passChanged={passChanged} setPassword={setPassword} />
        <NormalButton
          rounded={'full'}
          disabled={!canSubmitPassword}
          type='submit'
          onClick={() => renewPassword}
        >
            Enregistrer le mot de passe
        </NormalButton>
      </form>

    </div>


  </StyledProfile>)
}

const StyledProfile = styled.div`

  padding-top: var(--spc-4);
  border-top: 1px solid var(--black);
  display: grid;
  grid-template-columns: 1fr;

  @media (${screen.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  .leftborder-blue {
    border-left: var(--spc-4) solid var(--brand-color);
    padding-left: var(--spc-4);

    h3, p {
      display: inline-block;
      margin-right: var(--spc-3);
      font-size: var(--text-lg);
    }
  }

  h2, h3, p {
    color: var(--black);
  }

  h2 {
    display: inline-flex;
    column-gap: var(--spc-2);
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


export default withEdiAuth(Profile, {model: ACCOUNT, action: UPDATE, pathAfterFailure: `${BASEPATH_EDI}/login`})
