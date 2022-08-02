import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import BulbTip from '../../Tip/BulbTip'
import {BookingPreviewActionLink} from '../../BookingDetail/BookingPreviewActions'
import {screen} from '../../../styles/screenWidths'

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
      <BookingPreviewActionLink href={link || '/'} >
        Faire ma demande de prise en charge CPF
      </BookingPreviewActionLink>
    </StyledAskForCPF>
  )
}

const StyledAskForCPF = styled.div`

font-size: var(--text-xs);
display: flex;
flex-direction: column;

@media (${screen.sm}) {
  
  & > * {
    max-width: var(--booking-max-width);
    margin: 0 auto;
    margin-bottom: var(--spc-4); 
  }
  
  & > :last-child {
    margin-bottom: 0; 
  }
}
    
`

export default AskForCPF
