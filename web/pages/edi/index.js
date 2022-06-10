import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {client} from '../../utils/client'
import {BASEPATH_EDI, API_PATH} from '../../utils/consts'
import withEdiAuth from '../../hoc/withEdiAuth'


const HomeEdi = () => {
  
  const router = useRouter()
  
  useEffect(() => {
    const landing = async() => {
      await client(`${API_PATH}/users/landing-page`)
        .then(landingPage => {
          router.push(landingPage)
        })
        .catch(e => console.error(`landingpage`, e))
    }
    landing()
  }, [])

  return (<div>Bienvenue</div>)
}

export default withEdiAuth(HomeEdi, {pathAfterFailure: `${BASEPATH_EDI}/login`})
