import React from 'react'
import Link from 'next/link'
import ContactUs from './ContactUs'
const {getLoggedUser} = require('../../utils/context')
const {ORDER, QUOTATION, BASEPATH_EDI, PRODUCT} = require('../../utils/consts')

const MENUS=[
  {
    access: models => models.includes(ORDER),
    label: 'Mes commandes',
    url: `${BASEPATH_EDI}/orders`,
  },
  {
    access: models => models.includes(QUOTATION),
    label: 'Mes devis',
    url: `${BASEPATH_EDI}/quotations`,
  },
  {
    access: models => models.includes(PRODUCT),
    label: 'Produits',
    url: `${BASEPATH_EDI}/products`,
  },
  {
    access: () => !!getLoggedUser(),
    label: 'Se déconnecter',
    url: `${BASEPATH_EDI}/quotations`,
  },
]

const QuickMenu = ({accessRights}) => {
  const menus= accessRights ? MENUS.filter(m => m.access(accessRights.getModels())) : []

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
