import React, { ReactNode } from 'react'
import { Input } from '@chakra-ui/core'
import FormControl from './FormControl'
import { useForm } from '../../../hooks/useForm'
import usePropsSelector from '../../../hooks/usePropsSelector'

type TextControlPropsType = {
  name: string
  label: string | ReactNode
  autoFocus?: boolean
}

const TextControl: React.FC<TextControlPropsType> = ({
  name,
  label,
  autoFocus = false,
}) => {
  const { setValueFromEvent } = useForm()
  const value = usePropsSelector(name)

  return (
    <FormControl htmlFor={name} label={label}>
      <Input
        id={name}
        name={name}
        autoFocus={autoFocus}
        size="sm"
        value={value || ''}
        type="text"
        onChange={setValueFromEvent}
      />
    </FormControl>
  )
}

export default TextControl
