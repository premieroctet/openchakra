import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import {screen} from '../../../web/styles/screenWidths'
import {FEURST_PHONE_NUMBER, BASEPATH_EDI} from '../../utils/feurst/consts'
import QuickMenu from './QuickMenu'

import Countdown from './Countdown'
import {StyledCountdown} from './components.styles'


const Header = ({accessRights}) => {

  // Set time limit for countdown
  const hourLimit = new Date()
  hourLimit.setHours(11)
  hourLimit.setMinutes(0)
  hourLimit.setSeconds(0)

  return (
    <>
      <InfoBox>
        <p>Toute commande de moins de 30 articles passée avant {hourLimit.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric'})} sera traitée dans la journée. <StyledCountdown> <Countdown limit={hourLimit} /> </StyledCountdown>Notre secrétariat est ouvert du lundi au vendredi de 9:00 à 17:00.</p>
      </InfoBox>
      <HeaderContainer role="banner">

        <a className='phonenumber' href={`tel:${FEURST_PHONE_NUMBER.replace(/\s+/g, '')}`}>Une question ? {FEURST_PHONE_NUMBER}</a>

        <Link href={`${BASEPATH_EDI}`}>
          <LogoLink aria-label="Accueil" href={`${BASEPATH_EDI}`}>
            <img className='img-responsive max-w-200' src="https://feurst.fr/wp-content/uploads/2022/01/logo-feurst-01.svg" alt='' width={350} height={104} />
          </LogoLink>
        </Link>
        <QuickMenu accessRights={accessRights} />
      </HeaderContainer>
    </>
  )
}

const HeaderContainer = styled.header`

  display: grid;
  grid-template-columns: 1fr;
  row-gap: var(--spc-4);
  align-items: center;
  column-gap: var(--spc-8);
  margin-block: var(--spc-8) var(--spc-18);
  width: var(--container-lg);
  margin-inline: auto;
  justify-items: center;

  @media (${screen.md}) {
    grid-template-columns: 1fr 1fr 1fr;
  }


  .phonenumber {
    font-size: var(--text-sm);
    white-space: nowrap;
    color: var(--black);
    font-weight: var(--font-bold);
    text-decoration: none;

    @media (${screen.lg}) {
      font-size: var(--text-base);
    }
  }
`

const LogoLink = styled.a`
  justify-self: center;
  cursor: pointer;
`

const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--brand-color);
  color: var(--white);
  font-weight: var(--font-bold);
  text-align: center;
  padding-block: var(--spc-2);
  padding-inline: var(--spc-1);
`

export default Header
