import React from 'react'
import styled from 'styled-components'
import {screen} from '../../styles/screenWidths'
import {ActionButton, ActionLink} from '../Actions/Actions'
import {API_PATH, BOOK_STATUS} from '../../utils/consts'
import {client} from '../../utils/client'
import {snackBarSuccess, snackBarError} from '../../utils/notifications'

const BookingElearningAccess = ({booking}) => {
  
  const isConfirmedBooking = booking.status === BOOK_STATUS.CONFIRMED

  const receiveAccessByMail = async() => {
    // WIP
    await client(`${API_PATH}/booking/${booking.id}/send-course-access`, {method: 'POST'})
      .then(() => snackBarSuccess('Envoyé'))
      .catch(error => {
        if (error.info) {
          snackBarError(error?.info.message || 'Erreur envoi')
        }
      })
     
  }

  console.log(booking.elearning_link)

  return (<ElearningAccess locked={isConfirmedBooking}>
    <h3>Vos accès au contenu e-learning</h3>
    <ActionButton onClick={receiveAccessByMail}>Recevoir mes accès par mail</ActionButton>
    <ActionLink href={booking.elearning_link} >
      Accéder à mon parcours de formation
    </ActionLink>
  
  </ElearningAccess>
  )

}

const ElearningAccess = styled.div`

  background-color: var(--booking-background);

  ${props => {
  if (!props.locked) {
    return `
      opacity: 0.2;
      
      a, button {
        cursor: not-allowed;
      }
    `
  }
}
  
  };

  
  h3 {
    color: var(--black);
    @media (${screen.sm}) {
      margin-left: var(--booking-left-margin); 
      margin-block-start: 0;
    }
  }



`

export default BookingElearningAccess
