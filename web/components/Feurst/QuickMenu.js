import React from 'react'
import Link from 'next/link'
import ContactUs from './ContactUs'
const {getLoggedUser} = require('../../utils/context')
const {CREATE, ORDER, QUOTATION, BASEPATH_EDI, PRODUCT, SHIPRATE} = require('../../utils/consts')

const MENUS=[
  {
    enabled: rights => rights.hasModel(ORDER),
    label: 'Mes commandes',
    url: `${BASEPATH_EDI}/orders`,
  },
  {
    enabled: rights => rights.hasModel(QUOTATION),
    label: 'Mes devis',
    url: `${BASEPATH_EDI}/quotations`,
  },
  {
    enabled: rights => rights.isActionAllowed(PRODUCT, CREATE) || rights.isActionAllowed(SHIPRATE, CREATE),
    label: 'Administration',
    url: `${BASEPATH_EDI}/products`,
  },
  {
    enabled: () => !!getLoggedUser(),
    label: 'Se déconnecter',
    url: `${BASEPATH_EDI}/login?out`,
  },
]

const QuickMenu = ({accessRights}) => {
  const menus=MENUS.filter(m => m.enabled(accessRights))

  if (menus.length==0) {
    return (<ContactUs />)
  }
  return (
    <>
      {menus.map((menu, i) => (
        <div key={`menu${i}`} className='flex gap-x-4 items-center'>
          <Link key={menu} href={menu.url}><a>{menu.label}</a></Link>
          
        </div>
      ))}
    </>
  )
}

module.exports=QuickMenu
