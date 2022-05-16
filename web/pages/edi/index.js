import React from 'react'
import {useRouter} from 'next/router'
import {BASEPATH_EDI} from '../../utils/consts'
import withEdiAuth from '../../hoc/withEdiAuth'


const HomeEdi = () => {

  const router = useRouter()

  const redirectToLanding = localStorage.getItem('landing')

  if (redirectToLanding) {
    router.push(redirectToLanding)
  }

  return (<div>Bienvenue</div>)
}

export default withEdiAuth(HomeEdi, {pathAfterFailure: `${BASEPATH_EDI}/login`})
