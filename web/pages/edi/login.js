import React, {useEffect} from 'react'
import Login from '../../components/Feurst/Login'
import styled from 'styled-components'
import {useRouter} from 'next/router'
import Header from '../../components/Feurst/Header'
import {basePathEdi} from '../../hoc/withEdiAuth'

const {
  removeAlfredRegistering,
} = require('../../utils/context')
const {clearAuthenticationToken} = require('../../utils/authentication')

const HomeGrid = styled.div`
  display: grid;
  column-gap: 2rem;
  grid-template-columns: 1fr;
  justify-items: center;
  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr
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
      router.push(basePathEdi)
    }
  }


  return (
    <>
      <Header />
    
      <HomeGrid>
    
        <ResponsiveImg src="" alt='' width={500} height={500} />
        <div>
          <Login login={redirect}/>
        </div>
      </HomeGrid>
    </>)
}
  
export default LoginPage
  
