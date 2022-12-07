import React, { memo } from 'react'
import {
  SliderTrack,
  SliderFilledTrack,
  Slider,
  SliderThumb,
} from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import usePropsSelector from '~hooks/usePropsSelector'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import TextControl from '~components/inspector/controls/TextControl'

const CircularProgressPanel = () => {
  const { setValue } = useForm()

  const value = usePropsSelector('value')
  const thickness = usePropsSelector('thickness')

  return (
    <>
      <FormControl label="Value">
        <Slider
          onChange={value => setValue('value', value)}
          min={0}
          max={100}
          step={1}
          value={value || 100}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <TextControl name="size" label="Size" />

      <FormControl label="Thickness">
        <Slider
          onChange={value => setValue('thickness', value)}
          min={0.1}
          max={1}
          step={0.1}
          defaultValue={thickness}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
        </Slider>
      </FormControl>

      <ColorsControl label="Color" name="color" enableHues />

      <SwitchControl label="Loading" name="isIndeterminate" />
    </>
  )
}

export default memo(CircularProgressPanel)
