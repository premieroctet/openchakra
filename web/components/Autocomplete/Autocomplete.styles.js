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
      color: var(--gray-800);
      width: 100%;
    }
  }

  input {
    border: ${props => (props.noborder ? '0' : '1px solid var(--gray-800)')};
  }

  [aria-expanded="true"] + [role="listbox"] {
    border: '1px solid var(--gray-800)';
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
    width: 100%;
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
