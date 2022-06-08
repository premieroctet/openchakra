import React from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {theme, GlobalStyleEdi} from '../../styles/feurst/feurst.theme'
import Header from './Header'

const EdiContainer = ({accessRights, children}) => {
  
  return (
  <ThemeProvider theme={theme}>
    <Skeleton>
      <Header accessRights={accessRights} />
        {children}
    </Skeleton>
    <GlobalStyleEdi />
  </ThemeProvider>
  )
}

const Skeleton = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 3rem auto auto 1fr 3rem; // infobox, header, tabs, content, footer
  grid-template-columns: 1fr;
`

export default EdiContainer