import React from 'react'
import {Tab} from '@headlessui/react'
import styled from 'styled-components'
import Router from 'next/router'
import {screen} from '../../styles/screenWidths'
const {CREATE, ORDER, QUOTATION, VIEW, PRODUCT, SHIPRATE, ACCOUNT, BASEPATH_EDI} = require('../../utils/consts')

const Tabstyled = styled(Tab.List)`

  display: grid;
  grid-template-columns: var(--grid-cols-1);
  margin-inline: auto;
  margin-bottom: var(--spc-10);

  @media (${screen.md}) {
    grid-template-columns: var(--grid-cols-3);
  }

  button, button::after, button[aria-selected=true]::after{
    transition: background-color ease-in-out var(--delayIn), color ease-in-out var(--delayIn), border ease-in-out var(--delayIn);
    will-change: 'background-color, color, border';
  }

  button {
    flex-basis: 300px;
    padding: .5rem 2rem;
    border:0;
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    position: relative;
    outline:none;
  }

  button[aria-selected=true] {
    background: ${props => props.theme.colors.yellow || 'yellow'};
    color: ${props => props.theme.colors.white || '#FFF'};
  }

  button[aria-selected=true]::after {
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
  {
    title: 'Comptes',
    url: `${BASEPATH_EDI}/accounts`,
    model: ACCOUNT,
    action: VIEW,
  },
  {
    title: 'Articles',
    url: `${BASEPATH_EDI}/products`,
    model: PRODUCT,
    action: VIEW,
  },
  {
    title: 'Frais de livraison',
    url: `${BASEPATH_EDI}/shiprates`,
    model: SHIPRATE,
    action: VIEW,
  },
]

const Tabs = props => {
  const {accessRights}=props

  const filteredContents=tabsContent // .filter(c => props.accessRights.isActionAllowed(c.model, c.action))
  const selIndex=filteredContents.findIndex(m => m.model==accessRights.getModel() && m.action==accessRights.getAction())
  return (
    <Tab.Group onChange={ index => Router.push(filteredContents[index].url)} defaultIndex={selIndex}>
      <Tabstyled>
        {filteredContents.map((elem, i) => (
          <Tab key={`tab${i}`}>
            {elem.title}
          </Tab>
        ))}
      </Tabstyled>
    </Tab.Group>

  )
}
module.exports=Tabs
