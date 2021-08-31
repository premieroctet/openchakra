import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import axios from 'axios'
import {TextField} from '@material-ui/core'

function linkedinAPI() {
  const [value, setValue] = useState('')

  useEffect(() => {
    console.log('coucou')
    fetch(`https://api.linkedin.com/v2/companySearch?q=${value}`, {
      method: 'POST',
      mode: 'no-cors',
    }).then(res => console.log(res, 'ok')).catch(err => console.error(err))
  }, [value])

  return(
    <>
      <TextField
        onChange={e => setValue(e.target.value)}
        placeholder={'recherche'}
        value={value}
      />
    </>
  )
}

export default linkedinAPI
