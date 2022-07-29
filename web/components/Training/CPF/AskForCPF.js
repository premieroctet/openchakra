import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import BulbTip from '../../Tip/BulbTip'

const AskForCPF = ({link}) => {

  return (
    <StyledAskForCPF>
      <BulbTip>
      Formulez votre demande de prise en charge sur
votre CPF. Une fois votre dossier complet, vous
recevrez vos accès au contenu de la formation dès
lors que votre réservation
sera confirmée
      </BulbTip>
      <Link href={link || '/'} >
        <a>Faire ma demande de prise en charge CPF</a>
      </Link>
    </StyledAskForCPF>
  )
}

const StyledAskForCPF = styled.div`

    font-size: var(--text-sm);
    width: min(calc(100% - 2rem), 25rem);
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    
    a {
      border-radius: var(--rounded-3xl);
      font-weight: var(--font-bold);
      text-align: center;
      color: var(--white) !important;
      text-decoration: none;
      background-color: var(--secondary-color);
      padding-block: var(--spc-4);
      padding-inline: var(--spc-4);
    }
`

export default AskForCPF
