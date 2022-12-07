import React from 'react'
import styled from 'styled-components'

const BulbTip = ({bgColor, children, ...props}) => (
  <Tip bgColor={bgColor} className='tip' {...props}>
    <span className='img'>💡</span>
    {children}
  </Tip>
)

const Tip = styled.p`

  padding: var(--spc-2);
  display: grid;
  grid-template-columns: 3rem 1fr;
  align-items: center;
  column-gap: var(--spc-4);
  .img {
      font-size: 2rem;
      justify-self: center;
      text-shadow: 0px 0px 2px gray;
    }
    
  ${props => {
  return `
        background-color: ${props.bgColor ? props.bgColor : '#eee'};    
    `
}
  }
`

export default BulbTip
