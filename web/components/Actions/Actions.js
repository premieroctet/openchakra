import React from 'react'
import styled from 'styled-components'
import {screen} from '../../styles/screenWidths'


const BookingPreviewActionLink = ({href, children}) => {

  return (
    <BookingPreviewAction as={'a'} href={href}>
      {children}
    </BookingPreviewAction>
  )
}

const BookingPreviewActionButton = ({onClick, children}) => {

  return (
    <BookingPreviewAction as={'button'} onClick={onClick}>
      {children}
    </BookingPreviewAction>
  )

}

const BookingPreviewAction = styled.div`
  
    display: block;
    text-decoration: none;
    appearance: none;
    border: 0;
    cursor: pointer;
    margin-inline: auto;
    color: var(--white) !important;
    background-color: var(--secondary-color);
    border-radius: var(--rounded-full);
    padding: var(--spc-4) var(--spc-12);
    margin-bottom: var(--spc-4);
    text-align: left;
    min-width: 100%;
    
    @media (${screen.sm}) {
      min-width: var(--booking-max-width);
      max-width: var(--booking-max-width);
    }
  
`

export {BookingPreviewActionLink, BookingPreviewActionButton}
