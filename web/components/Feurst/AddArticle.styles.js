import styled from 'styled-components'
import {screen} from '../../styles/screenWidths'

const FormAddArticle = styled.form`
  display: grid;
  grid-template-columns: var(--grid-cols-1);
  row-gap: var(--spc-2);
  margin-bottom: var(--spc-10);

  @media (${screen.lg}) {
    grid-template-columns: 2fr 2fr 1fr;
    align-items: baseline;
    column-gap: var(--spc-5)
  }
`

const Label = styled.label`
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  width: max-content;
`

const Input = styled.input`
  transition: border var(--delayIn) ease-in-out;
  padding: var(--spc-2);
  min-height: var(--minTapSize);
  outline: none;
  border: 1px solid var(--gray-800);
  width: min-content;

  &:focus {
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

const Refcatalog = styled.div`
  
  display: grid;
  align-items:center;
  column-gap: var(--spc-2);
  grid-template-columns: 1fr;
  grid-template-areas: 'downlabel' 
                       'downinput' 
                       'loading'
                       'downresults';
  position: relative;

  .loading {
    top: 0;
    position: absolute;
    grid-area: loading;
  }

  label {
    grid-area: downlabel;
  }
  
  /* Container for input */
  [role="combobox"] {
    width: min-content;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    grid-area: downinput;
    position: relative;
    & input {
      padding-right: 60px;
      color: var(--gray-800);
    }
  }

  [aria-expanded="true"] + [role="listbox"] {
    border: 1px solid var(--gray-800);
    border-top: 0;
  }
  
  [role="listbox"] {
    border-bottom-left-radius: var(--spc-2);
    border-bottom-right-radius: var(--spc-2);
    transition: all ease-in 1s;
    list-style-type: none;
    grid-area: downresults;
    max-height: 300px;
    overflow-y: scroll;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background: var(--white);
    margin-top: 0;
    padding-inline: var(--spc-3);

    & li {
      font-size: var(--text-base);
      padding: var(--spc-2);
      border-bottom: 1px solid var(--gray-800);

      &[aria-selected=true] {
        background: var(--yellow-500);
      }
    }
  }

  button {
    position: absolute;
    right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    min-height: var(--minTapSize);
    background: none;
    border: 0;
    font-size: var(--text-lg);
    color: var(--gray-800);
  }

  button + button {
    right: 0px;
  }

  @media (${screen.sm}) {
    grid-template-columns: max-content auto;
    grid-template-areas: 'downlabel downinput' 
    'loading downresults';
  }
  @media (${screen.lg}) {
    grid-template-columns: auto auto;
  }
`

export {FormAddArticle, Label, Input, Refquantity, Refcatalog}
