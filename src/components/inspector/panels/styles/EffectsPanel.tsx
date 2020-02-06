import React, { memo, useMemo } from 'react'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/core'
import TextControl from '../../controls/TextControl'

const EffectsPanel = () => {
  const { setValue } = useForm()
  const opacity = usePropsSelector('opacity')

  const normalizedOpacity = useMemo(() => {
    return opacity * 100 || 100
  }, [opacity])

  return (
    <>
      <FormControl label="Opacity">
        <Slider
          min={1}
          onChange={value => setValue('opacity', value / 100)}
          value={normalizedOpacity}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
      </FormControl>

      <TextControl name="shadow" label="Shadow" />
    </>
  )
}

export default memo(EffectsPanel)
