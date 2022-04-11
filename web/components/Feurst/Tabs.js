import React from 'react'
import {Tab} from '@headlessui/react'
import styled from 'styled-components'
import Router, {useRouter} from 'next/router'
import Link from 'next/link'
import {screen} from '../../styles/screenWidths'
const {BASEPATH_EDI} = require('../../utils/feurst/consts')
const {CREATE, ORDER, QUOTATION, VIEW} = require('../../utils/consts')

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

const tabsContent = [
  {
    title: 'Créer une commande',
    url: `${BASEPATH_EDI}/orders/create`,
    model: ORDER,
    action: CREATE,
  },
  {
    title: 'Mes commandes',
    url: `${BASEPATH_EDI}/orders`,
    model: ORDER,
    action: VIEW,
  },
  {
    title: 'Créer un devis',
    url: `${BASEPATH_EDI}/quotations/create`,
    model: QUOTATION,
    action: CREATE,
  },
  {
    title: 'Mes devis',
    url: `${BASEPATH_EDI}/quotations`,
    model: QUOTATION,
    action: VIEW,
  },
]

const Tabs = props => {
  const {accessRights}=props

  const router = useRouter()

  const filteredContents=tabsContent // .filter(c => props.accessRights.isActionAllowed(c.model, c.action))
  
  return (
    <>
      <Tabstyled className='container'>
        {filteredContents.map((elem, i) => (
          <Link key={`tab${i}`} href={elem.url} passHref>
            <a className={router.pathname == elem.url ? 'highlight' : ''}>{elem.title}</a>
          </Link>
        ))}
      </Tabstyled>

    </>
  )
}
module.exports=Tabs
