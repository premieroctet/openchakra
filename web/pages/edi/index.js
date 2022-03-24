import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import Header from '../../components/Feurst/Header'
import {getLoggedUser, getLoggedAs} from '../../utils/context'
import dynamic from 'next/dynamic'

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

const DynamicLogin = dynamic(
  () => import('./login'),
  {
    loading: () => <p>...</p>,
    ssr: false,
  },
)

const Edi = () => {
  
  const router = useRouter()

  const isLogged = getLoggedUser()

  useEffect(() => {
    !isLogged
      ? router.push('/edi/login')
      : router.push('/edi/orders')
  }, [isLogged])

  return (
    <>
      <Header accessRights={accessRights.client} />
      <DynamicLogin />
    </>
  )
}

export default Edi
