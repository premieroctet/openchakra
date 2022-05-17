import styled, {ThemeProvider} from 'styled-components'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Login from '../../components/Feurst/Login'
import Header from '../../components/Feurst/Header'
import {theme, GlobalStyleEdi} from '../../styles/feurst/feurst.theme'
import {screen} from '../../styles/screenWidths'
import {client} from '../../utils/client'
import {API_PATH, BASEPATH_EDI, FEURST_IMG_PATH} from '../../utils/consts'
import {
  removeAlfredRegistering,
} from '../../utils/context'
import {clearAuthenticationToken} from '../../utils/authentication'
import {snackBarError} from '../../utils/notifications'
import SpinnerCircle from '../../components/Spinner/SpinnerCircle'

const HomeGrid = styled.div`
  display: grid;
  column-gap: var(--spc-6);
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;

  @media (${screen.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`

const ResponsiveImg = styled.img`
  width: 100%;
  height: auto;
  background-size: contain;
`

const LoginPage = () => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (router.query?.out) {
      clearAuthenticationToken()
      localStorage.removeItem('path')
      removeAlfredRegistering()
    }
  }, [router])

  const redirect = async() => {

    const path = localStorage.getItem('path')
    if (path) {
      localStorage.removeItem('path')
      router.push(path)
    }
    else {
      setLoading(true)
      let landingPage
      await client(`${API_PATH}/users/landing-page`)
        .then(res => {
          landingPage = res
        })
        .catch(e => {
          landingPage = BASEPATH_EDI
          snackBarError('redirection personnalisée non trouvée')
          console.error(`landingpage`, e)
        })
        .finally(() => {
          setLoading(false)
          router.push(landingPage)
        })
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyleEdi />
      <Header />
      <HomeGrid>
        <ResponsiveImg src={`${FEURST_IMG_PATH}/dent_accueil_feurst.webp`} alt='' />
        <SpinnerCircle loading={loading}>
          <Login login={redirect} />
        </SpinnerCircle>
      </HomeGrid>
    </ThemeProvider>)
}

export default LoginPage
