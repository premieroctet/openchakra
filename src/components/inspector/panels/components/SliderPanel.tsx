import React, { memo } from 'react'
import FormControl from '../../controls/FormControl'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
} from '@chakra-ui/core'
import { useForm } from '../../../../hooks/useForm'
import ColorsControl from '../../controls/ColorsControl'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import NumberControl from '../../controls/NumberControl'

const SliderPanel = () => {
  const { setValue, setValueFromEvent } = useForm()
  const size = usePropsSelector('size')
  const value = usePropsSelector('value')

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

      <NumberControl label="min" name="min" />
      <NumberControl label="max" name="max" />
      <NumberControl label="step" name="step" />

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
