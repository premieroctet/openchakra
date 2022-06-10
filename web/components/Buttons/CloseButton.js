import React from 'react'
import styled from 'styled-components'

const StyledCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right:1rem;
  background: transparent;
  border: 0;
  cursor: pointer;
  width: var(--minTapSize);
  height: var(--minTapSize);
  
  span {
    font-size: var(--text-2xl);
    color: var(--black);
  }
`

const CloseButton = props => {
  return (
    <StyledCloseButton aria-label='fermer' className='button_close' {...props}>
      <span role={'img'}>✕</span>
    </StyledCloseButton>
  )
}

export default CloseButton
