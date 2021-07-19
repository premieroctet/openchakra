import React, {useEffect, useState} from 'react'
import {getPartner} from '../../utils/context'

function Asset(props) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if(getPartner()) {
      setUrl(`/static/assets/${getPartner()}/${props.src} `)
    }
    else{
      setUrl(`/static/assets/${props.src}`)
    }
  })

  return(
    <>
      <img src={url} alt={'coucou'} title={'coucou'}/>
    </>
  )
}

export default Asset
