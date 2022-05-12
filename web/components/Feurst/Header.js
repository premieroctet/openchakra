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
  justify-items: center;
  column-gap: var(--spc-8);
  margin-bottom: var(--spc-6);
  width: var(--container-lg);
  margin-inline: auto;

  @media (${screen.md}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  a {
    font-size: var(--text-sm);
    text-decoration-line: none;
    font-weight: var(--font-bold);
    transition: all var(--delayIn) ease-out;
    color: var(--brand-color) !important;
    white-space: nowrap;

    &.current {
      color: var(--yellow-500) !important;
      display: flex;
      flex-direction: column;
      row-gap: var(--spc-1);
      align-items: center;
    }
    &.current::after {
      content: '';
      width: 70%;
      height: 2px;
      background-color: var(--brand-color);
    }

    &:hover {
      /* text-decoration-line: underline;
      text-decoration-color: ${props => props.theme.colors?.blue || '#00F'}; */
    }
   
    @media (${screen.lg}) {
      font-size: var(--text-base);
    }
  }

  .phonenumber {
    white-space: nowrap;
    color: ${props => props.theme.colors?.blueFeurst || '#00F'};
    font-weight: var(--font-semibold);
  }
`

const Header = ({accessRights}) => {
  return (
    <HeaderContainer role="banner">
      
      <a className='phonenumber' href={`tel:${FEURST_PHONE_NUMBER.replace(/\s+/g, '')}`}>{FEURST_PHONE_NUMBER}</a>
      
      <Link href={`${BASEPATH_EDI}`}>
        <a><img className='img-responsive max-w-200' src="https://feurst.fr/wp-content/uploads/2022/01/logo-feurst-01.svg" alt='' width={350} height={104} /></a>
      </Link>
      <QuickMenu accessRights={accessRights} />
    </HeaderContainer>
  )
}

module.exports=Header
