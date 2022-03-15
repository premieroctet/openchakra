import React from 'react'
import Link from 'next/link'

import EDINav from './EDINav'

import {feurstImgPath} from '../../pages/edi/index'
const feurstPhoneNumber = '+33 4 77 27 40 63'


const EDIHeader = ({accessRights}) => {
  return (
    <div className='flex justify-evenly gap-x-8'>
      <div className='flex items-center'>
        <a className='phonenumber' href={`tel:${feurstPhoneNumber.replace(/\s+/g, '')}`}>{feurstPhoneNumber}</a>
      </div>
      <Link href="/edi">
        <a><img className='img-responsive max-w-350' src={`${feurstImgPath}/logo-feurst.webp`} alt='' width={350} height={104} /></a>
      </Link>
      <EDINav accessRights={accessRights} />
    </div>
  )
}

export default EDIHeader
