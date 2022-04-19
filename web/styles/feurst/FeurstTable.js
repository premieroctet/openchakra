import React from 'react'
import styled from 'styled-components'
import Table from '../../components/Table/Table'
import {screen} from '../screenWidths'

const TablesStyles = styled.div`

  table {
    display: block;
    border: 1px solid var(--stone-300);
    border-collapse: collapse;
    text-align: center;
    width: 100%;
    max-width: fit-content;
    margin: 0 auto;
    overflow-x: auto;
    white-space: nowrap;
    margin-bottom: 1rem;
  }

  @media (${screen.lg}) {

    table {
      overflow-x: visible;
      white-space: unset;
    }
  }
  
  caption {
    caption-side: top;
    background: var(--brand-color);
    color: var(--white);
    padding-block: var(--spc-1);
    font-weight: var(--font-bold);
  }
  
  button {
    background: none;
    border: 0;
  }
  
  th, td {
    border-left: 1px solid var(--stone-300);
    padding: var(--spc-2);
  }
  
  tr {
    border-top: 1px solid var(--stone-300);
  }

  tr:nth-child(2n + 2) {
    background: var(--stone-200);
  }


  input {
    max-width: 80%;
    background: inherit;
    border: 1px solid var(--stone-400);
  }


  /* Boite dialogues filtres */

  .filter_panel {
    position: absolute;
    z-index: 3;
    top: calc(100% + var(--spc-2));
    left: calc(0px - var(--spc-2));
    background: rgba(240, 240, 240, 0.9);
    padding: 1rem;
    display: grid;
    border: 1px solid var(--stone-400);
    border-top: 0;

    input {
      max-width: 80%;
      background: var(--white);
    }
  }

  .filter_trigger img {
    max-width: 20px;
  }

  .header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    /* Table header */
    & > button {
      font-weight: var(--font-bold);
      font-size: var(--text-sm);
    }
    
  }
`

const FeurstTable = props => {
  return (
    <TablesStyles>
      <Table {...props} />
    </TablesStyles>
  )
}


export default FeurstTable
