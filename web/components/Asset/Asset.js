import React, {useEffect, useState} from 'react'
import {getPartner} from '../../utils/context'

function Asset(props) {
  const [url, setUrl] = useState('/assets/img/banner/bannerProfile.svg')

  useEffect(() => {
    if(getPartner()) {
      setUrl(`/getPartner${props.src} `)
    }
  })

  return(
    <>
      <img src={url} alt={'coucou'} title={'coucou'}/>
    </>
  )
}

export default Asset
