import React, { ReactNode } from 'react'
import { Select } from '@chakra-ui/react'
import FormControl from './FormControl'
import { useForm } from '~hooks/useForm'

type VariantsControlPropsType = {
  name: string
  label: string | ReactNode
  value: string
}

const VariantsControl = (props: VariantsControlPropsType) => {
  const { setValueFromEvent } = useForm()

  return (
    <FormControl htmlFor={props.name} label={props.label}>
      <Select
        id={props.name}
        onChange={setValueFromEvent}
        name={props.name}
        size="sm"
        value={props.value || ''}
      >
        <option>solid</option>
        <option>outline</option>
        <option>ghost</option>
        <option>link</option>
        <option>unstyled</option>
        <option>subtle</option>
      </Select>
    </FormControl>
  )
}

export default VariantsControl
