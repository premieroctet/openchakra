import React from 'react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/core'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'

const AlertIconPanel = () => {
  const { setValue } = useForm()
  const size = usePropsSelector('size')

  return (
    <>
      <FormControl label="Size">
        <Slider
          onChange={size => setValue('size', size)}
          min={1}
          max={800}
          step={1}
          value={size}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
      </FormControl>
    </>
  )
}

export default AlertIconPanel
