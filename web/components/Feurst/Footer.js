import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {screen} from '../../../web/styles/screenWidths'


const Footer = () => (
  <StyledFooter>
    <Link href={'#'}>Mentions légales  </Link>
    <Link href={'#'}>CGUs</Link>
    <Link href={'#'}>Politique de confidentialité</Link>
  </StyledFooter>
)


const StyledFooter = styled.div`
  padding-block: var(--spc-4);
  background-color: var(--stone-600);
  color: var(--white);
  font-weight: var(--font-bold);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
`

export default Footer
