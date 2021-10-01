import React from 'react'
import Button from '@material-ui/core/Button'

function CustomButton(props) {
  return(
    <Button
      {...props}
      classes={{root: `${props.className} customButton`}}
    >
      {props.children}
    </Button>
  )

}

export default CustomButton
