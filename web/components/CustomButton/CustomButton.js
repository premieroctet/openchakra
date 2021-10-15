import React from 'react'
import Button from '@material-ui/core/Button'

function CustomButton(props) {
  return(
    <Button
      {...props}
      className={`${props.className} custombutton`}
    >
      {props.children}
    </Button>
  )

}

export default CustomButton
