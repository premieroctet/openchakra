import React, {useEffect} from 'react'
import axios from 'axios'

function hashtag() {
  useEffect(() => {
    let myInit = {
      method: 'GET',
      headers: {'Accept': 'application/json'},
      mode: 'no-cors',
    }

    fetch('https://api.tagdef.com/chien', myInit)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [])
  
  return(
    <h1>HashTag</h1>
  )
}

export default hashtag
