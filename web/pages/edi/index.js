import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import EDIHeader from '../../components/Feurst/EDIHeader'

import '../../static/feurst.css'

export const feurstImgPath = '../../static/assets/img/feurst'

const accessRights = {
  client: [
    {
      url: 'edi/orders',
      label: 'Commandes',
    },
    {
      url: 'edi/account',
      label: 'Mon compte',
    },
  ],
}

const Edi = () => {
  // const access = true
  // const router = useRouter()

  // useEffect(() => {
  //   !access
  //     ? router.push('/edi/login')
  //     : router.push('/edi/orders')
  // }, [access])

  return (
    <>
      <EDIHeader accessRights={accessRights.client} />
    </>
  )
}

export default Edi
