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
  Slider,
} from '@chakra-ui/react'
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
          size="sm"
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
        <Slider
          onChange={value => setValue('spacing', value)}
          min={-3}
          max={6}
          step={1}
          defaultValue={spacing}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
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
    </>
  )
}

export default memo(AvatarGroupPanel)
