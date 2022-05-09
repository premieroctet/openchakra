import React, {useState} from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {screen} from '../../styles/screenWidths'
const {
  HANDLED,
  PARTIALLY_HANDLED,
  VALID,
} = require('../../utils/feurst/consts')
const {handledQuotationsColumns} = require('./tablestructures')
const BaseListTable = require('./BaseListTable')

const Tabstyled = styled.div`

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
    font-weight: var(--font-semibold);
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
  }

`


const HandledQuotations = ({accessRights}) => {

  const [selectedTab, setSelectedTab]=useState(0)

  const TABS=[{
    title: 'Devis à traiter',
    filter: o => [PARTIALLY_HANDLED, VALID].includes(o.status),
  },
  {
    title: 'Devis traités',
    filter: o => [HANDLED].includes(o.status),
  }]

  const currentFilter=TABS[selectedTab].filter

  return (
    <>
      <Tabstyled className='container-base'>
        {TABS.map((tab, i) => (
          <Link key={i} href='#' passHref>
            <a className={selectedTab == i ? 'highlight' : ''} onClick={() => setSelectedTab(i)}>{tab.title}</a>
          </Link>
        ))}
      </Tabstyled>

      <BaseListTable
        caption='Traitement des devis'
        endpoint='quotations'
        filter={currentFilter}
        accessRights={accessRights}
        columns={handledQuotationsColumns}
      />
    </>
  )
}

module.exports=HandledQuotations
