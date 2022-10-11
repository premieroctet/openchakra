import React, { memo, useState } from 'react'
import { 
  Input, 
  RadioGroup,
  Radio,
  FormLabel,
} from '@chakra-ui/react'
import { useForm } from '~hooks/useForm'
import FormControl from '~components/inspector/controls/FormControl'
import usePropsSelector from '~hooks/usePropsSelector'

const DatePanel = () => {

  const { setValueFromEvent, setValue } = useForm()
  const format = usePropsSelector('data-format')
  const value = usePropsSelector('data-value')

  const minDateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }

  const availableDateOptions = {
    weekday: [ 'short', 'long'], // 'narrow',
    year: ['numeric', '2-digit'],  
    month: ['numeric'  , 'short' , 'long'], // 'narrow', '2-digit'
    day: ['numeric' ], // '2-digit'
    hour: ['numeric' ], // '2-digit'
    minute: ['numeric' ], // '2-digit'
    second: ['numeric' ], // '2-digit'
  }

  const dateoptions = format || minDateOptions

  const changeFormatDate = (typedate: string, valdate: string) => {

    let prepareDateFormat = dateoptions
    if (valdate === '') {
      delete prepareDateFormat[typedate]
    } else {
      prepareDateFormat[typedate] = valdate
    }

    setValue('data-format', prepareDateFormat)
  }

  return (
    <>
      {Object.entries(availableDateOptions).map(([typeDate, possibleDateFormatters]) => {
      return (
        <div key={typeDate}>
        <FormLabel>{typeDate}</FormLabel>
        <RadioGroup onChange={(e) => changeFormatDate(typeDate, e)} size={'sm'} defaultValue={dateoptions[typeDate] || ''} >
          <Radio value={''} >&empty;</Radio>
          {possibleDateFormatters.map((possVal, i) => (
            <Radio key={i} value={possVal} >{possVal}</Radio>
          ))}
      </RadioGroup>
      </div>
      )}
      )}

      <FormControl label="Example" htmlFor="datavalue">
        <Input
          id='datavalue'
          type='date'
          value={value || ''}
          size="sm"
          name="data-value"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  )
}

export default memo(DatePanel)
