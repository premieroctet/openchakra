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
  transition: border var(--delayIn) ease-in-out, outline var(--delayIn) ease-in-out;
  padding: var(--spc-2);
  min-height: var(--minTapSize);
  outline: none;
  border: 1px solid var(--gray-800);
  width: min-content;

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

export {FormAddArticle, Label, Input, Refquantity}
