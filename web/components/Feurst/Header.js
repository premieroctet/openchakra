import React from 'react'
import Link from 'next/link'
import Nav from './Nav'
import {feurstPhoneNumber} from '../../hoc/withEdiAuth'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  a {
    text-decoration-line: none; 
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
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

const Header = ({accessRights = []}) => {
  return (
    <HeaderContainer className='container flex flex-wrap justify-evenly gap-x-8 mb-6'>
      <div className='flex items-center'>
        <a className='phonenumber' href={`tel:${feurstPhoneNumber.replace(/\s+/g, '')}`}>{feurstPhoneNumber}</a>
      </div>
      <Link href="/edi">
        <a><img className='img-responsive max-w-350' src="https://feurst.fr/wp-content/uploads/2022/01/logo-feurst-01.svg" alt='' width={350} height={104} /></a>
      </Link>
      <Nav accessRights={accessRights} />
    </HeaderContainer>
  )
}

export default Header
