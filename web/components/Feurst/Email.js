import {IconButton, Input, InputAdornment} from '@material-ui/core'
import Done from '@material-ui/icons/Done'
import Clear from '@material-ui/icons/Clear'
import React, {useState, useEffect} from 'react'
import Validator from 'validator'

const EMail = ({value: orgEmail, onChange: onValidate}) => {

  const [email, setEmail]=useState(orgEmail)
  const [emailValid, setEmailValid]=useState(false)

  useEffect(() => {
    setEmailValid(email && Validator.isEmail(email))
  }, [email])

  const submitEmail = () => {
    onValidate && onValidate(email)
  }

  const cancel = () => {
    setEmail(orgEmail)
  }

  const onChange= ev => {
    setEmail(ev.target.value)
  }

  return (
    <Input
      type= 'text'
      name="email"
      value={email}
      onChange={onChange}
      endAdornment={emailValid && email!=orgEmail &&
        <InputAdornment position="end">
          <Done onClick={() => submitEmail()}/>
          <Clear onClick={() => cancel()}/>
        </InputAdornment>
      }
    />
  )
}

export default EMail
