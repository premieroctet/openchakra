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

  const possibleDateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }

  const [dateoptions, setDateoptions] = useState(format || {})

  const changeFormatDate = (e, ef) => {
    console.log(e, ef)
  }

  return (
    <>
      {Object.entries(possibleDateOptions).map(([typeDate, typeValue]) => (
        <>
        <FormLabel>{typeDate}</FormLabel>
        <RadioGroup onChange={(e) => changeFormatDate(typeDate, e)} size={'sm'} defaultValue={typeValue} >
          <Radio value={''} >None</Radio>
          <Radio value={'numeric'} >numeric</Radio>
          <Radio value={'long'} >long</Radio>
      </RadioGroup>
      </>
      ))}
      <FormControl label="Format" htmlFor="dataformat">
        <Input
          id='dataformat'
          value={JSON.stringify(dateoptions) || ''}
          size="sm"
          name="data-format"
          onChange={setValueFromEvent}
        />
      </FormControl>

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
