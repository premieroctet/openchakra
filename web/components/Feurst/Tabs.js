import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {screen} from '../../styles/screenWidths'
const {CREATE_FOR, HANDLE} = require('../../utils/feurst/consts')
const {CREATE, ORDER, QUOTATION, VIEW, PRODUCT, SHIPRATE, ACCOUNT, BASEPATH_EDI, PRICELIST} = require('../../utils/consts')

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

const tabsContent = [
  {
    title: 'Créer une commande',
    url: `${BASEPATH_EDI}/orders/create`,
    model: ORDER,
    action: CREATE,
    visible: [ORDER, QUOTATION],
  },
  {
    title: 'Créer une commande',
    url: `${BASEPATH_EDI}/orders/create`,
    model: ORDER,
    action: CREATE_FOR,
    visible: [ORDER, QUOTATION],
  },
  {
    title: 'Mes commandes',
    url: `${BASEPATH_EDI}/orders`,
    model: ORDER,
    action: VIEW,
    visible: [ORDER, QUOTATION],
  },
  {
    title: 'Traitement des commandes',
    url: `${BASEPATH_EDI}/orders/handle`,
    model: ORDER,
    action: HANDLE,
    visible: [ORDER, QUOTATION],
  },
  {
    title: 'Créer un devis',
    url: `${BASEPATH_EDI}/quotations/create`,
    model: QUOTATION,
    action: CREATE,
    visible: [ORDER, QUOTATION],
  },
  {
    title: 'Créer un devis',
    url: `${BASEPATH_EDI}/quotations/create`,
    model: QUOTATION,
    action: CREATE_FOR,
    visible: [ORDER, QUOTATION],
  },
  {
    title: 'Mes devis',
    url: `${BASEPATH_EDI}/quotations`,
    model: QUOTATION,
    action: VIEW,
    visible: [ORDER, QUOTATION],
  },
  {
    title: 'Traitement des devis',
    url: `${BASEPATH_EDI}/quotations/handle`,
    model: QUOTATION,
    action: HANDLE,
    visible: [ORDER, QUOTATION],
  },
  {
    title: 'Comptes',
    url: `${BASEPATH_EDI}/accounts`,
    model: ACCOUNT,
    action: VIEW,
    visible: [ACCOUNT, PRODUCT, SHIPRATE, PRICELIST],
  },
  {
    title: 'Articles',
    url: `${BASEPATH_EDI}/products`,
    model: PRODUCT,
    action: VIEW,
    visible: [ACCOUNT, PRODUCT, SHIPRATE, PRICELIST],
  },
  {
    title: 'Tarifs',
    url: `${BASEPATH_EDI}/prices`,
    model: PRICELIST,
    action: VIEW,
    visible: [ACCOUNT, PRODUCT, SHIPRATE, PRICELIST],
  },
  {
    title: 'Frais de livraison',
    url: `${BASEPATH_EDI}/shiprates`,
    model: SHIPRATE,
    action: VIEW,
    visible: [ACCOUNT, PRODUCT, SHIPRATE, PRICELIST],
  },
]

const Tabs = props => {
  const {accessRights}=props

  const router = useRouter()

  const allowTab = tab => {
    if (!accessRights.isActionAllowed(tab.model, tab.action)) {
      return false
    }
    if (!tab.visible.includes(accessRights.getModel())) {
      return false
    }
    return true
  }

  const filteredContents=tabsContent.filter(t => allowTab(t))

  return (
    <>
      <Tabstyled className='container-base'>
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
