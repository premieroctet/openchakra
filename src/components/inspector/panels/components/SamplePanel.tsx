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

const SamplePanel = () => {
  const { setValue } = useForm()
  const value = usePropsSelector('value')

  return (
    <>
      <ColorsControl label="Color Scheme" name="colorScheme" />
    </>
  )
}

export default memo(SamplePanel)