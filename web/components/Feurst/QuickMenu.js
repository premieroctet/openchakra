import React from 'react'
import Link from 'next/link'
import ContactUs from './ContactUs'

const QuickMenu = ({accessRights = []}) => {
  return (
    <>
    <div className='flex gap-x-4 items-center'>
      <Link key={`nav${1}`} href={'url'}><a>Menu 1</a></Link>
    </div>
    <div className='flex gap-x-4 items-center'>
    <Link key={`nav${2}`} href={'url'}><a>Menu 2</a></Link>}
    </div>
</>
  )
  /**
  return (accessRights.length ?
    <div className='flex gap-x-4 items-center'>
      {accessRights.map((link, index) => (<Link key={`nav${index}`} href={link.url}><a>{link.label}</a></Link>))}
    </div>
    : <>
      <ContactUs />
    </>
  )
  */
}

module.exports=QuickMenu
