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
    max-width: 100vw;
    margin-inline: auto;
    overflow-x: auto;
    white-space: nowrap;
    margin-bottom: var(--spc-8);
  }

  @media (${screen.lg}) {

    table {
      display: table;
      max-width: unset;
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
    height: var(--spc-12);
  }

  tr:nth-child(2n + 2) {
    background: var(--stone-200);
  }

  tfoot {
    background-color: var(--stone-600);
    color: var(--white);
    font-weight: var(--font-bold);
  }

  input {
    max-width: var(--spc-24);
    padding: var(--spc-2) var(--spc-4);
    background: inherit;
    border: 1px solid var(--stone-400);
  }

  a {
    font-weight: var(--font-bold);
    font-size: var(--text-base);
    color: var(--brand-color);
    text-decoration:none;
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

  .pagination {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: var(--spc-2);
    margin-bottom: var(--spc-8);

    button {
      border-radius: var(--rounded-md);
      background-color: var(--brand-color);
      color: white;
      padding: var(--spc-2) var(--spc-3);
      cursor: pointer;
    }

    input {
      padding: var(--spc-2) var(--spc-2);
      max-width: 7ch;
      text-align: center;
    }

    select {
      background: none;
      border:0;
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


module.exports=FeurstTable
