import React, { ReactNode } from 'react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/core'
import FormControl from './FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'

type TextControlPropsType = {
  name: string
  label: string | ReactNode
}

const NumberControl: React.FC<TextControlPropsType> = ({ name, label }) => {
  const { setValue } = useForm()
  const value = usePropsSelector(name)

  return (
    <FormControl htmlFor={name} label={label}>
      <NumberInput
        size="sm"
        onChange={value => setValue(name, value)}
        value={value || ''}
        min={1}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  )
}

export default NumberControl
