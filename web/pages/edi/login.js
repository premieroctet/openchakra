import styled, {ThemeProvider} from 'styled-components'
import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import Login from '../../components/Feurst/Login'
import Header from '../../components/Feurst/Header'
import {theme, GlobalStyleEdi} from '../../styles/feurst.theme'
import {screen} from '../../styles/screenWidths'
const {BASEPATH_EDI} = require('../../utils/consts')

const {
  removeAlfredRegistering,
} = require('../../utils/context')
const {clearAuthenticationToken} = require('../../utils/authentication')

const HomeGrid = styled.div`
  display: grid;
  column-gap: var(--spc-12);
  grid-template-columns: 1fr;
  justify-items: center;

  @media (${screen.lg}) {
    grid-template-columns: 3fr 2fr;
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

  const redirect = () => {
    const path = localStorage.getItem('path')
    if (path) {
      localStorage.removeItem('path')
      router.push(path)
    }
    else {
      router.push(BASEPATH_EDI)
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyleEdi />
      <Header />
      <HomeGrid>
        <ResponsiveImg src="" alt='' width={500} height={500} />
        <Login login={redirect}/>
      </HomeGrid>
    </ThemeProvider>)
}

export default LoginPage
