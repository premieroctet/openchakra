import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {screen} from '../../../web/styles/screenWidths'
import {BASEPATH_EDI} from '../../utils/consts'

const Footer = () => (
  <StyledFooter>
    <Link href={'#'}><a>Mentions légales</a></Link>
    <Link href={`${BASEPATH_EDI}/cgv`}><a>Conditions générales de vente</a></Link>
    <Link href={'#'}><a>Politique de confidentialité</a></Link>
  </StyledFooter>
)


const StyledFooter = styled.footer`
  align-self: flex-end;
  padding-block: var(--spc-4);
  background-color: var(--stone-600);
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  
  a {
    color: var(--white) !important;
    font-weight: var(--font-bold);
  }
  
  @media (${screen.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export default Footer
