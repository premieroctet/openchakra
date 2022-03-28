import React from 'react'
import styled, {css} from 'styled-components'

const Button = styled.button`
  
  appearance: none;
  background: none;
  border:0;
  cursor: pointer;
  width: ${props => {
  switch (props.size) {
    case 'full-width':
      return '100%'
    default:
      return 'fit-content'
  }
}};
  
  font-size: ${props => props.theme.fontSizes.xs};
  background-color: ${props => props.theme.mainBgColor};
  color: ${props => props.theme.mainTextColor};
  border: 2px solid ${props => props.theme.mainBgColor};
`

Button.defaultProps = {
  theme: {
    main: 'yellow',
    fontSizes: {xs: '0.65rem'},
  },
}

export default Button


export const AwesomeButton = ({
  type = 'button',
  bgEdge = 'bg-orange-800',
  bgFront = 'bg-orange-600',
  textColor = 'text-white',
  children,
}) => {
  return (
    <button
      type={type}
      className="text-xl fitcontent pushable inline-block no-underline"
    >
      <span className="shadow_button" />
      <span className={`edge ${bgEdge}`} />
      <span className={`front ${bgFront} ${textColor}`}>{children}</span>
    </button>
  )
}
  
