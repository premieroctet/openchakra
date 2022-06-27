import styled from 'styled-components'
import {screen} from '../../styles/screenWidths'


const StyledAutocomplete = styled.div.attrs(props => ({
  noborder: props.noborder,
}))`
  display: grid;
  align-items:center;
  justify-content: start;
  column-gap: var(--spc-2);
  grid-template-columns: 1fr;
  grid-template-areas: 'downerror'
                       'downlabel' 
                       'downinput'
                       'downresults';
  position: relative;

  label {
    grid-area: downlabel;
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
  }

  .loading {
    top:0;
    right: 0;
    position: absolute;
  }

  .error {
    grid-area: downerror;
  }
  
  /* Container for input */
  [role="combobox"] {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    grid-area: downinput;
    position: relative;
    & input {
      padding-right: 60px;
      color: var(--black);
      width: 100%;
    }
  }

  input {
    border: ${props => (props.noborder ? '0' : '1px solid var(--gray-800)')};
    transition: border var(--delayIn) ease-in-out, outline var(--delayIn) ease-in-out;
    padding: var(--spc-2);
    min-height: var(--minTapSize);
    outline: none;
    width: min-content;
  }

  input:placeholder-shown {
    font-style: italic;
  }

  
  [role="listbox"] {
    border-bottom-left-radius: var(--spc-2);
    border-bottom-right-radius: var(--spc-2);
    transition: all ease-in 1s;
    list-style-type: none;
    grid-area: downresults;
    max-height: 40vh;
    overflow-y: scroll;
    position: absolute;
    top: 4px;
    left: 0;
    z-index: 1;
    background: var(--white);
    margin-top: 0;
    width: max(calc(100% - 2rem), 30rem);
    padding-inline: var(--spc-3);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

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

  button:last-of-type {
    right: 0px;
  }

  @media (${screen.sm}) {
    grid-template-columns: max-content 1fr;
    grid-template-areas: 'downerror downerror'
    'downlabel downinput' 
    '. downresults';
  }
  @media (${screen.lg}) {
    grid-template-columns: auto 1fr;
  }
`

export {StyledAutocomplete}
