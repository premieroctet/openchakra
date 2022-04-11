import React from 'react'
import Link from 'next/link'
import ContactUs from './ContactUs'
const {getLoggedUser} = require('../../utils/context')
const {ORDER, QUOTATION} = require('../../utils/consts')

const MENUS=[
  {
    access: models => models.includes(ORDER),
    label: 'Mes commandes',
    url: `/edi/orders`,
  },
  {
    access: models => models.includes(QUOTATION),
    label: 'Mes devis',
    url: `/edi/quotations`,
  },
  {
    access: () => !!getLoggedUser(),
    label: 'Se déconnecter',
    url: `/edi/quotations`,
  },
]

const QuickMenu = ({accessRights}) => {
  const menus=MENUS.filter(m => m.access(accessRights.getModels()))

  if (menus.length==0) {
    return (<ContactUs />)
  }
  return (
    <>
      {menus.map(menu => (
        <div className='flex gap-x-4 items-center'>
          <Link key={menu} href={menu.url}><a>{menu.label}</a></Link>
        </div>
      ))}
    </>
  )
}

module.exports=QuickMenu
