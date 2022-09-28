import React, { memo } from 'react'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import {
    SliderTrack,
    SliderFilledTrack,
    Slider,
    SliderThumb,
  } from '@chakra-ui/react'

const SliderPanel = () => {
  const { setValue } = useForm()
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
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>
      <ColorsControl label="Color Scheme" name="colorScheme" />
    </>
  )
}

export default memo(SliderPanel)