import React from 'react'
import Link from 'next/link'
import ContactUs from './ContactUs'

const Nav = ({accessRights = []}) => {
  return (accessRights.length ?
    <div className='flex gap-x-4 items-center'>
      {accessRights.map((link, index) => (<Link key={`nav${index}`} href={link.url}><a>{link.label}</a></Link>))}
    </div>
    : <>
      <ContactUs />
    </>
  )
}

export default Nav
