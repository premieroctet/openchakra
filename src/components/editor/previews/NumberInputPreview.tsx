import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

interface IProps {
  component: IComponent
  index: number
}

const NumberInputPreview = ({ component, index }: IProps) => {
  const { props } = useInteractive(component, index)

  return (
    <NumberInput {...props} index={index}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}

export default NumberInputPreview
