import React from 'react'
import Button from '@material-ui/core/Button'

function CustomButton(props) {
  return(
    <Button
      {...props}
      className={`${props.className || ''} custombutton`}
      error={props.error}
    >
      {props.children}
    </Button>
  )

}

module.exports=CustomButton
