import styled, {keyframes} from 'styled-components'
import {screen} from '../../styles/screenWidths'

const H2confirm = styled.h2`
  font-size: var(--text-2xl);
  color: var(--black);
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  row-gap: var(--spc-2);

  button {
    background-color: unset;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--spc-1);
    font-weight: var(--font-bold);
    font-size: var(--text-base);
    
    span {
      font-size: var(--text-2xl);
      color: var(--black);
    }
  }
`

const FormAddArticle = styled.form`
  display: grid;
  grid-template-columns: var(--grid-cols-1);
  row-gap: var(--spc-2);
  margin-bottom: var(--spc-10);

  @media (${screen.lg}) {
    grid-template-columns: 2fr 2fr 1fr;
    align-items: flex-start;
    column-gap: var(--spc-5)
  }
`

const Label = styled.label`
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  width: max-content;
`

const Input = styled.input.attrs(props => ({
  noborder: props.noborder,
}))`
  transition: border var(--delayIn) ease-in-out, outline var(--delayIn) ease-in-out;
  padding: var(--spc-2);
  min-height: var(--minTapSize);
  outline: none;
  border: ${props => (props.noborder ? '0' : '1px solid var(--gray-800)')};
  width: min-content;
  color: var(--gray-800);

  &:focus {
    outline: 2px solid var(--yellow-500);
    border-color: var(--brand-color);
  }
`

const Refquantity = styled.div`
  display: grid;
  align-items:center;
  column-gap: var(--spc-2);
  row-gap: var(--spc-2);
  grid-template-columns: 1fr;
  
  @media (${screen.sm}) {
    grid-template-columns: auto 1fr;
  }
`


const slidein = keyframes`
  0% {
    top: -100%;
    left: -200%;
  }
  
  100% {
    top: -100%;
    left: 200%;
  }
`


const StyledCountdown = styled.div`
  
  display: inline-flex;
  position: relative;
  overflow: clip;
  margin-inline: var(--spc-1);

  [role=timer] {
    display: inline-flex;
    column-gap: 0.5rem;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 0.5rem;
    height: 5rem;
    background-color: var(--white);
    filter: blur(10px);
    border-radius: 50%;
    animation: 20s cubic-bezier(0.99, 0.03, 0.99, 0.22) infinite alternate ${slidein};
  }

  span {
    border-radius: 0.25rem;
    color: var(--black);
    background-color: var(--yellow-500) !important;
    padding: var(--spc-2) var(--spc-1);
    min-width: 5ch;
  }

  .hours::after {
    content: ' h';
  }
  .minutes::after {
    content: ' min';
  }

  .seconds::after {
    content: ' s';
  }
`

export {H2confirm, FormAddArticle, Label, Input, Refquantity, StyledCountdown}
