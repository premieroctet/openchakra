import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
const {FEURST_PHONE_NUMBER, BASEPATH_EDI} = require('../../utils/consts')
const QuickMenu = require('./QuickMenu')

const HeaderContainer = styled.header`

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  column-gap: var(--spc-8);
  margin-bottom: var(--spc-6);
  width: var(--container-lg);
  margin-inline: auto;

  a {
    text-decoration-line: none;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);FEURST_PHONE
    transition: all var(--delayIn) ease-out;
    color: ${props => props.theme.colors?.black || '#111'};

    &:hover {
      text-decoration-line: underline;
      text-decoration-color: ${props => props.theme.colors?.blue || '#00F'};
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
      <div className='flex items-center'>
        <a className='phonenumber' href={`tel:${FEURST_PHONE_NUMBER.replace(/\s+/g, '')}`}>{FEURST_PHONE_NUMBER}</a>
      </div>
      <Link href={`${BASEPATH_EDI}`}>
        <a><img className='img-responsive max-w-350' src="https://feurst.fr/wp-content/uploads/2022/01/logo-feurst-01.svg" alt='' width={350} height={104} /></a>
      </Link>
      <QuickMenu accessRights={accessRights} />
    </HeaderContainer>
  )
}

module.exports=Header
