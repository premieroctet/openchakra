import React from 'react'
import Link from 'next/link'
import Nav from './Nav'
import {feurstPhoneNumber} from '../../hoc/withEdiAuth'


const Header = ({accessRights = []}) => {
  return (
    <div className='flex justify-evenly gap-x-8'>
      <div className='flex items-center'>
        <a className='phonenumber' href={`tel:${feurstPhoneNumber.replace(/\s+/g, '')}`}>{feurstPhoneNumber}</a>
      </div>
      <Link href="/edi">
        <a><img className='img-responsive max-w-350' src="https://feurst.fr/wp-content/uploads/2022/01/logo-feurst-01.svg" alt='' width={350} height={104} /></a>
      </Link>
      <Nav accessRights={accessRights} />
    </div>
  )
}

export default Header
