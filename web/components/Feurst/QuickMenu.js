import React from 'react'
import Link from 'next/link'
import {getLoggedUser} from '../../utils/context'
import {CREATE, ORDER, QUOTATION, BASEPATH_EDI, PRODUCT, SHIPRATE, ACCOUNT} from '../../utils/consts'
import ContactUs from './ContactUs'

const MENUS=[
  {
    enabled: rights => rights.hasModel(ORDER),
    label: 'Commandes',
    url: `${BASEPATH_EDI}/orders`,
  },
  {
    enabled: rights => rights.hasModel(QUOTATION),
    label: 'Devis',
    url: `${BASEPATH_EDI}/quotations`,
  },
  {
    enabled: rights => rights.isActionAllowed(PRODUCT, CREATE) || rights.isActionAllowed(SHIPRATE, CREATE) || rights.isActionAllowed(ACCOUNT, CREATE),
    label: 'Administration',
    url: `${BASEPATH_EDI}/accounts`,
  },
  {
    enabled: () => !!getLoggedUser(),
    label: 'Se déconnecter',
    url: `${BASEPATH_EDI}/login?out=true`,
  },
]

const QuickMenu = ({accessRights}) => {
  const menus=MENUS.filter(m => accessRights && m.enabled(accessRights))

  if (!menus.length) {
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

export default QuickMenu
