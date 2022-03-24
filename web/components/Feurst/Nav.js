import React from 'react'
import Link from 'next/link'

const Nav = ({accessRights}) => {
  return (
    <div className='flex gap-x-4 items-center'>
      {accessRights.map((link, index) => (<Link key={`nav${index}`} href={link.url}>{link.label}</Link>))}
    </div>
  )
}

export default Nav
