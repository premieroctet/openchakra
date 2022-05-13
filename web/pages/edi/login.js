import styled, {ThemeProvider} from 'styled-components'
import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import Login from '../../components/Feurst/Login'
import Header from '../../components/Feurst/Header'
import {theme, GlobalStyleEdi} from '../../styles/feurst/feurst.theme'
import {screen} from '../../styles/screenWidths'
import {client} from '../../utils/client'
import {API_PATH, FEURST_IMG_PATH} from '../../utils/consts'

const {
  removeAlfredRegistering,
} = require('../../utils/context')
const {clearAuthenticationToken} = require('../../utils/authentication')

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
      const landingPage = await client(`${API_PATH}/users/landing-page`)
        .catch(e => console.error(`Type de role non reconnu`, e))
      router.push(landingPage)
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyleEdi />
      <Header />
      <HomeGrid>
        <ResponsiveImg src={`${FEURST_IMG_PATH}/dent_accueil_feurst.webp`} alt='' />
        <Login login={redirect}/>
      </HomeGrid>
    </ThemeProvider>)
}

export default LoginPage
