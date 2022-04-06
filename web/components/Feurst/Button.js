import React from 'react'
import styled, {css} from 'styled-components'

let convert = require('color-convert')

/* TODO : Util to move */
function darkerColor(hexColor, percentLower=15) {
  const [h, s, l] = convert.hex.hsl(hexColor)
  return `hsl(${h}, ${s}%, ${l >= percentLower ? l - percentLower : 0}%)`
}

const Button = styled.button.attrs(props => ({
  size: props.size || '',
}))`
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
  font-size: ${props => props.theme.fontSizes.lg};
`

Button.defaultProps = {
  theme: {
    colors: {blue: 'blue', white: '#FFF'},
    fontSizes: {lg: '1rem'},
    rounded: {
      xl: '0.75rem',
      '3xl': '1.5rem',
    },
  },
}

const StyledButton = styled(Button).attrs(props => ({
  size: props.size || '',
  bgColor: props.bgColor || props.theme.colors.blue,
  textColor: props.textColor || props.theme.colors.white,
}))`
  position: relative;
  border: 0;
  padding: 0;
  transition: filter 250ms;
  border-radius: ${props => props.theme.rounded['3xl']};
  color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.rounded.xl};

  &:hover {
    filter: brightness(110%);
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`


const ButtonShadow = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${props => props.theme.rounded['3xl']};
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);

  ${StyledButton}:hover && {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  ${StyledButton}:active && {
    transform: translateY(1px);
    transition: transform 34ms;
  }
`

const ButtonEdge = styled.span.attrs(props => ({
  bgColor: props.bgColor || props.theme.colors.blue,
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${props => props.theme.rounded['3xl']};
  background-color: ${props => darkerColor(props.bgColor)};
  `

const ButtonFront = styled.span.attrs(props => ({
  bgColor: props.bgColor || props.theme.colors.blue,
  textColor: props.textColor || props.theme.colors.white,
}))`
  display: block;
  position: relative;
  padding: 12px 42px;
  border-radius: ${props => props.theme.rounded['3xl']};
  font-size: 1.25rem;
  will-change: transform;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};

  ${StyledButton}:hover && {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  ${StyledButton}:active && {
    transform: translateY(-2px);
    transition: transform 34ms;
  }
  `

ButtonFront.defaultProps = ButtonEdge.defaultProps = ButtonShadow.defaultProps = StyledButton.defaultProps = Button.defaultProps

const PleasantButton = ({
  type = 'button',
  size,
  bgColor,
  textColor,
  children,
  className,
  onClick,
}) => {

  return (
    <StyledButton
      type={type}
      size={size}
      className={className}
      onClick={onClick}
    >
      <ButtonShadow />
      <ButtonEdge bgColor={bgColor} />
      <ButtonFront bgColor={bgColor} textColor={textColor} >{children}</ButtonFront>
    </StyledButton>
  )
}
  

export {Button, PleasantButton}
