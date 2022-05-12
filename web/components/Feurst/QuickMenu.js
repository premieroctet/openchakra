import React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import ContactUs from './ContactUs'
const {getLoggedUser} = require('../../utils/context')
const {CREATE, ORDER, QUOTATION, BASEPATH_EDI, PRODUCT, SHIPRATE, ACCOUNT} = require('../../utils/consts')


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
  
  function containsPartUrl(possibleurl, currentpath) {
    const regEx = new RegExp(possibleurl)
    return regEx.test(currentpath)
  }

  const router = useRouter()
  
  const menus=MENUS.filter(m => accessRights && m.enabled(accessRights))
  

  if (!menus.length) {
    return (<ContactUs />)
  }

  return (
    <>
      <div className='flex w-full justify-evenly gap-x-4 items-baseline'>
        {menus.map((menu, i) => (
          <Link key={`menu${i}`} href={menu.url}><a className={containsPartUrl(menu.url, router.pathname) ? 'current' : null}>{menu.label}</a></Link>
        ))}
      </div>
    </>
  )
}

module.exports=QuickMenu
