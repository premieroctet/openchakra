import React from 'react'
import { RadioGroup, Radio, Stack } from '@chakra-ui/react';



const Note = (
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
      {Array.from({length: +highestNote}, (el, index) => (
        <label>
          <input 
            type={'radio'} 
            name={`rating`} 
            className=""
            value={index + 1} 
            {...dataValue === index + 1 && {checked: true}} 
          />
        </label>
        )
      )}
      </Stack>
  )

}

export default Note
