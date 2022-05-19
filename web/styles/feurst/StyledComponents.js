import React from 'react'
import styled from 'styled-components'
import {screen} from '../../styles/screenWidths'


const StyledTabs = styled.div`

display: grid;
grid-template-columns: var(--grid-cols-1);
margin-inline: auto;
margin-bottom: var(--spc-10);
align-items: center;
align-content: center;

@media (${screen.md}) {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

a, a::after {
  transition: background-color ease-in-out var(--delayIn), color ease-in-out var(--delayIn), border ease-in-out var(--delayIn);
  will-change: 'background-color, color, border';
}

a {
  color: var(--black);
  display: inherit;
  align-items: center;
  height: 100%;
  padding: .5rem .5rem;
  border:0;
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  position: relative;
  text-align: center;
  text-decoration: none;
  background: ${props => props.theme?.colors?.lightGray || 'gray'};
}

a.highlight {
  background: ${props => props.theme?.colors?.yellow || 'yellow'};
  color: ${props => props.theme?.colors?.white || '#FFF'} !important;
}

a.highlight::after {
  --trianglebase: 10px;
  --trianglepeak: 15px;
  position: absolute;
  left: calc(50% - var(--trianglebase));
  bottom: calc(var(--trianglepeak) * -1);
  content: '';
  width: 0;
  height: 0;
  border-left: var(--trianglebase) solid transparent;
  border-right: var(--trianglebase) solid transparent;
  border-top: var(--trianglepeak) solid ${props => props.theme.colors.yellow || 'yellow'};
}`


const HandleLink = styled.a`
  display: inline-block;
  color: var(--white) !important;
  border-radius: var(--rounded-3xl);
  font-size: var(--text-base);
  z-index: 3;
  margin-block: var(--spc-1);
  padding: var(--spc-2) var(--spc-10);
  border: 1px solid var(--stone-500);
  cursor: pointer;
  position: relative;
  background-color: var(--green-500);
  overflow: hidden;
  transition: all 0.2s ease-out;
  
  &::before {
    content: "";
    position: absolute;
    width: 60%;
    z-index: -1;
    inset: 0;
    background-color: hsl(90.3, 38.3%, 60.4%);
    transform-origin: 50% 50%; 
    filter: blur(15px);
    transition: none;
    transform: translate(-20%, -120%);
  }
    
  &:hover::before, &:focus::before {
    transform: translate(100%, 150%);
    transition: transform 1s 0.5s ease-out;
  }
  
`

const HandleButton = styled.button`
  display: inline-block;
  color: var(--white) !important;
  border-radius: var(--rounded-3xl);
  font-size: var(--text-base);
  z-index: 3;
  margin-block: var(--spc-1);
  padding: var(--spc-2) var(--spc-10);
  border: 1px solid var(--stone-500);
  cursor: pointer;
  position: relative;
  background-color: var(--green-500);
  overflow: hidden;
  transition: all 0.2s ease-out;
  
  &::before {
    content: "";
    position: absolute;
    width: 60%;
    z-index: -1;
    inset: 0;
    background-color: hsl(90.3, 38.3%, 60.4%);
    transform-origin: 50% 50%; 
    filter: blur(15px);
    transition: none;
    transform: translate(-20%, -120%);
  }
    
  &:hover::before, &:focus::before {
    transform: translate(100%, 150%);
    transition: transform 1s 0.5s ease-out;
  }
  
`


export {StyledTabs, HandleLink, HandleButton}
