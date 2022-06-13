import React from 'react'
import styled, {css} from 'styled-components'

let convert = require('color-convert')

const applyBorderRadius = props => {
  switch (props.rounded) {
    case 'full':
      return 'var(--rounded-full)'
    case '3xl':
      return 'var(--rounded-3xl)'
    case '2xl':
      return 'var(--rounded-2xl)'
    case 'xl':
      return 'var(--rounded-xl)'
    case 'md':
      return 'var(--rounded-md)'
    default:
      return 'var(--rounded)'
  }
}

/* TODO : Util to move */
function darkerColor(hexColor, percentLower=15) {
  const [h, s, l] = convert.hex.hsl(hexColor)
  return `hsl(${h}, ${s}%, ${l >= percentLower ? l - percentLower : 0}%)`
}

const Button = styled.button.attrs(props => ({
  size: props.size || '',
  rounded: props.rounded || 'var(--rounded-xl)',
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
  border-radius: ${() => applyBorderRadius};
  font-size: ${props => props.theme.fontSizes.lg};
`

Button.defaultProps = {
  theme: {
    colors: {blue: 'blue', white: '#FFF'},
    fontSizes: {lg: '1rem'},
  },
}

const StyledButton = styled(Button).attrs(props => ({
  size: props.size || '',
  bgColor: props.bgColor || props.theme.colors.blue,
  textColor: props.textColor || props.theme.colors.white,
  rounded: props.rounded || 'var(--rounded-xl)',
}))`
  position: relative;
  border: 0;
  padding: 0;
  transition: filter 250ms;
  color: ${props => props.theme.colors.white};
  border-radius: ${() => applyBorderRadius};

  &:hover {
    filter: brightness(110%);
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`


const ButtonShadow = styled.span.attrs(props => ({
  rounded: props.rounded || 'var(--rounded-xl)',
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${() => applyBorderRadius};
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);

  ${StyledButton}:not(:disabled):hover && {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  ${StyledButton}:not(:disabled):active && {
    transform: translateY(1px);
    transition: transform 34ms;
  }
  `

const ButtonEdge = styled.span.attrs(props => ({
  bgColor: props.bgColor || props.theme.colors.blue,
  rounded: props.rounded || 'var(--rounded-xl)',
  borderColor: props.borderColor || `1px solid transparent`,
  bgColorDisabled: props.bgColorDisabled || props.theme.colors.metalGray,
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${() => applyBorderRadius};
  background-color: ${props => darkerColor(props.bgColor)};
  border: ${props => props.borderColor};
  

  ${StyledButton}:disabled && {
    background-color: ${props => darkerColor(props.bgColorDisabled)};
  }
  `

const ButtonFront = styled.span.attrs(props => ({
  bgColor: props.bgColor || props.theme.colors.blue,
  bgColorDisabled: props.bgColorDisabled || props.theme.colors.metalGray,
  borderColor: props.borderColor || `1px solid transparent`,
  textColor: props.textColor || props.theme.colors.white,
  rounded: props.rounded || 'var(--rounded-xl)',
}))`
  display: block;
  position: relative;
  padding: 12px 42px;
  border-radius: ${() => applyBorderRadius};
  font-size: 1.25rem;
  will-change: transform;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  border: ${props => props.borderColor};

  ${StyledButton}:disabled && {
    color: ${props => props.theme.colors.white};
    border: 0;
  }

  ${StyledButton}:not(:disabled):hover && {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  ${StyledButton}:not(:disabled):active && {
    transform: translateY(-2px);
    transition: transform 34ms;
  }

  ${StyledButton}:disabled && {
    background-color: ${props => props.bgColorDisabled};
  }
  `

ButtonFront.defaultProps = ButtonEdge.defaultProps = ButtonShadow.defaultProps = StyledButton.defaultProps = Button.defaultProps

const PleasantButton = ({
  type = 'button',
  size = null,
  rounded = null,
  bgColor = null,
  borderColor = null,
  textColor = null,
  children,
  ...rest
}) => {

  return (
    <StyledButton
      type={type}
      size={size}
      rounded={rounded}
      {...rest}
    >
      <ButtonShadow rounded={rounded} />
      <ButtonEdge bgColor={bgColor} rounded={rounded} borderColor={borderColor} />
      <ButtonFront bgColor={bgColor} textColor={textColor} borderColor={borderColor} rounded={rounded} >{children}</ButtonFront>
    </StyledButton>
  )
}

const BaseLink = ({
  size = null,
  rounded = null,
  bgColor = null,
  borderColor = null,
  textColor = null,
  children,
  ...rest
}) => {

  return (
    <StyledButton
      as={'a'}
      size={size}
      rounded={rounded}
      {...rest}
    >
      <ButtonShadow rounded={rounded} />
      <ButtonEdge bgColor={bgColor} rounded={rounded} borderColor={borderColor} />
      <ButtonFront bgColor={bgColor} textColor={textColor} borderColor={borderColor} rounded={rounded} >{children}</ButtonFront>
    </StyledButton>
  )
}

const PleasantLink = styled(BaseLink)`
  display: inline-block;
  width: 100%;
  text-align: center;
  text-decoration: none;
`
  

export {Button, PleasantButton, PleasantLink}
