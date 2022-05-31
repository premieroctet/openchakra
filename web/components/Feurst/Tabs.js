import React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {StyledTabs} from '../../styles/feurst/StyledComponents'
import {ORDER, QUOTATION, VIEW, PRODUCT, COMPANY, HANDLE, SHIPRATE, ACCOUNT, UPDATE, BASEPATH_EDI, PRICELIST} from '../../utils/consts'


const tabsContent = [
  {
    title: 'Traitement des commandes',
    url: `${BASEPATH_EDI}/orders/handle`,
    model: ORDER,
    action: HANDLE,
    visible: [ORDER],
  },
  {
    title: 'Mes commandes',
    url: `${BASEPATH_EDI}/orders`,
    model: ORDER,
    action: VIEW,
    visible: [ORDER],
  },
  {
    title: 'Mes devis',
    url: `${BASEPATH_EDI}/quotations`,
    model: QUOTATION,
    action: VIEW,
    visible: [QUOTATION],
  },
  {
    title: 'Traitement des devis',
    url: `${BASEPATH_EDI}/quotations/handle`,
    model: QUOTATION,
    action: HANDLE,
    visible: [QUOTATION],
  },
  {
    title: 'Comptes',
    url: `${BASEPATH_EDI}/accounts`,
    model: ACCOUNT,
    action: VIEW,
    visible: [ACCOUNT, PRODUCT, SHIPRATE, PRICELIST],
  },
  {
    title: 'Sociétés',
    url: `${BASEPATH_EDI}/companies`,
    model: COMPANY,
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
  {
    title: 'Mon profil',
    url: `${BASEPATH_EDI}/profile`,
    model: ACCOUNT,
    action: UPDATE,
    visible: [ACCOUNT],
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
      <StyledTabs className='container-base'>
        {filteredContents.map((elem, i) => (
          <Link key={`tab${i}`} href={elem.url} passHref>
            <a className={router.pathname == elem.url ? 'highlight' : ''}>{elem.title}</a>
          </Link>
        ))}
      </StyledTabs>

    </>
  )
}
export default Tabs
