import React, {useState, Fragment} from 'react'
import {Tab} from '@headlessui/react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import SpinnerEllipsis from '../Spinner/SpinnerEllipsis'
import {screen} from '../../styles/screenWidths'

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

const dynamicParams = {loading: () => <SpinnerEllipsis />}

const DynamicOrderCreate = dynamic(() => import('./OrderCreate'), dynamicParams)
const DynamicMyOrders = dynamic(() => import('./MyOrders'), dynamicParams)
const DynamicMyQuotations = dynamic(() => import('./MyQuotations'), dynamicParams)


const tabsContent = [
  {
    title: 'Créer une commande',
    component: <DynamicOrderCreate />,
  },
  {
    title: 'Mes commandes',
    component: <DynamicMyOrders />,
  },
  {
    title: 'Mes devis',
    component: <DynamicMyQuotations />,
  },
]

const Tabs = props => {

  return (
    <Tab.Group>
      <Tabstyled>
        {tabsContent.map((elem, i) => (
          <Tab key={`tab${i}`}>
            {elem.title}
          </Tab>
        ))}
      </Tabstyled>
      <Tab.Panels>
        {tabsContent.map((elem, i) => (
          <Tab.Panel key={`panel${i}`}>
            {elem.component}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  
  )
}
export default Tabs
