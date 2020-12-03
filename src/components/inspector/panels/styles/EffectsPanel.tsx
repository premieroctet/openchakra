import React, { memo, useMemo } from 'react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import {
  SliderTrack,
  SliderFilledTrack,
  Slider,
  SliderThumb,
} from '@chakra-ui/react'
import TextControl from '~components/inspector/controls/TextControl'

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
          onChange={(value: any) => setValue('opacity', value / 100)}
          value={normalizedOpacity}
          mr={2}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </FormControl>

      <TextControl name="boxShadow" label="Box Shadow" />
    </>
  )
}

export default memo(EffectsPanel)
