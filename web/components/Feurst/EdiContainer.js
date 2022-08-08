import React from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {feurst as GlobalStyleEdi} from '../../styles/globalStyles'
import {feurst} from '../../styles/themes'
import {MinGlobalStyles} from '../../styles/MinglobalStyles'
import Header from './Header'
import Footer from './Footer'

const EdiContainer = ({accessRights, children}) => {
  
  return (
    <ThemeProvider theme={feurst}>
      <Skeleton>
        <Header accessRights={accessRights} />
        {children}
        <Footer />
      </Skeleton>
      <GlobalStyleEdi />
      <MinGlobalStyles />
    </ThemeProvider>
  )
}

const Skeleton = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto auto auto 1fr 3rem; // infobox, header, tabs, content, footer

`

export default EdiContainer
