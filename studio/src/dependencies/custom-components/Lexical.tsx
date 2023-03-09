import React from 'react'
import { Stack } from '@chakra-ui/react';



const Lexical = (
  {
    "data-value": dataValue = 3, 
    "data-highestnote": highestNote = 5, 
    ...props
  }
  :{
    'data-value': number, 
    'data-highestnote': number
  }) => {

  return (
      <Stack isInline>
     
      </Stack>
  )

}

export default Lexical