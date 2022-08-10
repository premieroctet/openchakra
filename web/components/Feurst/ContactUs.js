import React from 'react'
import styled from 'styled-components'
import {FEURST_EMAIL} from '../../utils/feurst/consts'

const ContactUs = () => {
  return (
    <StyledContactUs href={`mailto:${FEURST_EMAIL}`}>Contactez nous</StyledContactUs>
  )
}

const StyledContactUs = styled.a`
  color: var(--black);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  text-decoration: none;
`

export default ContactUs
