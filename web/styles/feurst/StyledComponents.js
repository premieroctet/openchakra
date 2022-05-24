import React from 'react'
import {Combobox} from '@headlessui/react'
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

const StyledCombobox = styled(Combobox)`
  
  position: relative;  

  [role="listbox"] {
    border-bottom-left-radius: var(--spc-2);
    border-bottom-right-radius: var(--spc-2);
    border: 1px solid var(--gray-800);
    background-color: var(--white);
    border-top: 0;
    position: absolute;
    max-height: 300px;
    overflow-y: scroll;
    z-index: 2;
    top: var(--spc-6);
    width:100%;
    font-size: inherit;
    padding: 0;
    
    li {
      display: flex;
      justify-content: space-between;
      list-style-type: none;
      padding: var(--spc-2);
      border-bottom: 1px solid var(--gray-800);

      &.active {
        background: var(--yellow-500);
      }
    }
  }

  .comboboxinput {
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;

    input {
      width: 100%;
    }
    button {
      position: absolute;
      background: transparent;
      border: 0;
      right:0;
      transform: rotate(180deg);
      transition: transform var(--delayOut) cubic-bezier(.14,1.91,.83,.67);
      
      &[aria-expanded='true'] {
        transform: rotate(0)
      }
    }
    
  }

  input[aria-expanded='true'] {
    border-bottom: 0;
  }
  
`


export {StyledTabs, HandleLink, HandleButton, StyledCombobox}
