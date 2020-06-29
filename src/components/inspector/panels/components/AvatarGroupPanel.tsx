import React, { memo } from 'react'
import FormControl from '~components/inspector/controls/FormControl'
import {
  SliderTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SliderFilledTrack,
  Select,
} from '@chakra-ui/core'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'

const AvatarGroupPanel = () => {
  const { setValue, setValueFromEvent } = useForm()

  const size = usePropsSelector('size')
  const spacing = usePropsSelector('spacing')
  const max = usePropsSelector('max')

  return (
    <>
      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          boxSize="sm"
          value={size || ''}
          onChange={setValueFromEvent}
        >
          <option>2xs</option>
          <option>xs</option>
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
          <option>xl</option>
          <option>2xl</option>
        </Select>
      </FormControl>

      <FormControl label="Spacing">
        <SliderTrack
          onChange={value => setValue('spacing', value)}
          min={-3}
          max={6}
          step={1}
          defaultValue={spacing}
        >
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </FormControl>

      <FormControl label="max">
        <NumberInput
          boxSize="sm"
          onChange={value => setValue('max', value)}
          value={max}
          min={1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </>
  )
}

export default memo(AvatarGroupPanel)
