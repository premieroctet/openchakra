import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {screen} from '../../../web/styles/screenWidths'
import {FEURST_PHONE_NUMBER, BASEPATH_EDI} from '../../utils/consts'
import QuickMenu from './QuickMenu'

const HeaderContainer = styled.header`

  display: grid;
  grid-template-columns: 1fr;
  row-gap: var(--spc-2);
  align-items: center;
  column-gap: var(--spc-8);
  margin-block: var(--spc-8) var(--spc-12);
  width: var(--container-lg);
  margin-inline: auto;

  @media (${screen.md}) {
    grid-template-columns: 1fr 1fr 1fr;
  }


  .phonenumber {
    white-space: nowrap;
    color: ${props => props.theme.colors?.blueFeurst || '#00F'};
    font-weight: var(--font-semibold);
    text-decoration: none;
  }
`

const LogoLink = styled.a`
  justify-self: center;
  cursor: pointer;
`

const Header = ({accessRights}) => {

  return (
    <HeaderContainer role="banner">
      
      <a className='phonenumber' href={`tel:${FEURST_PHONE_NUMBER.replace(/\s+/g, '')}`}>{FEURST_PHONE_NUMBER}</a>
      
      <Link href={`${BASEPATH_EDI}`}>
        <LogoLink><img className='img-responsive max-w-200' src="https://feurst.fr/wp-content/uploads/2022/01/logo-feurst-01.svg" alt='' width={350} height={104} /></LogoLink>
      </Link>
      <QuickMenu accessRights={accessRights} />
    </HeaderContainer>
  )
}

export default Header
