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
}

const NumberInputPreview = ({ component }: IProps) => {
  const { props } = useInteractive(component)

  return (
    <NumberInput {...props}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}

export default NumberInputPreview
