import React, { memo } from 'react'
import FormControl from '../../controls/FormControl'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from '@chakra-ui/core'
import { useForm } from '../../../../hooks/useForm'
import ColorsControl from '../../controls/ColorsControl'
import usePropsSelector from '../../../../hooks/usePropsSelector'

const SliderPanel = () => {
  const { setValue, setValueFromEvent } = useForm()
  const size = usePropsSelector('size')
  const value = usePropsSelector('value')
  const max = usePropsSelector('max')

  return (
    <>
      <FormControl label="Value">
        <Slider
          onChange={value => setValue('value', value)}
          min={0}
          max={100}
          step={1}
          defaultValue={value}
          value={value}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl label="max">
        <NumberInput
          size="sm"
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

      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={size || ''}
          onChange={setValueFromEvent}
        >
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </Select>
      </FormControl>

      <ColorsControl label="Color" name="color" />
    </>
  )
}

export default memo(SliderPanel)
