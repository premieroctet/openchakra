import React from 'react'
import styled, {ThemeProvider} from 'styled-components'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import {useRouter} from 'next/router'
import Header from '../../components/Feurst/Header'
import {theme, GlobalStyleEdi} from '../../styles/feurst/feurst.theme'
import {snackBarSuccess, snackBarError} from '../../utils/notifications'
import {ADMIN, MANAGER, BASEPATH_EDI} from '../../utils/consts'
import CustomButton from '../../components/CustomButton/CustomButton'


const ForgotPassword = ({t}) => {

  const [email, setEmail] = React.useState('')
  const router = useRouter()

  const onChange = e => {
    setEmail(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()

    const user = {
      email,
    }

    axios.post('/myAlfred/api/users/forgotPassword', user)
      .then(() => {
        snackBarSuccess(ReactHtmlParser(t('FORGOT_PASSWORD.snackbar_send_email')) + email)
        router.push(`${BASEPATH_EDI}/login`)
      })
      .catch(err => {
        console.error(err)
        snackBarError(err?.response?.data.error)
      })
  }


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyleEdi />
      <Header />
      
      <Container>
        <h2>{ReactHtmlParser(t('FORGOT_PASSWORD.title'))}</h2>
        
        <form onSubmit={onSubmit}>
          <TextField
            id="standard-with-placeholder"
            label={ReactHtmlParser(t('FORGOT_PASSWORD.textfield_email'))}
            placeholder={ReactHtmlParser(t('FORGOT_PASSWORD.placeholder_email'))}
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            variant={'outlined'}
          />
          
          <CustomButton variant="contained" color={'primary'} onClick={onSubmit}>
            {ReactHtmlParser(t('FORGOT_PASSWORD.button_confirm'))}
          </CustomButton>
        </form>

      </Container>
      
    </ThemeProvider>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    color: var(--black);
  }

  form {
    display: flex;
    row-gap: var(--spc-4);
    flex-direction: column;
  }
`

export default withTranslation('custom', {withRef: true})(ForgotPassword)
