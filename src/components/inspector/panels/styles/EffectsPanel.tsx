import React, { memo, useMemo } from 'react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import { SliderTrack, SliderFilledTrack } from '@chakra-ui/core'
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
        <SliderTrack
          min={1}
          onChange={value => setValue('opacity', value / 100)}
          value={normalizedOpacity}
        >
          <SliderFilledTrack />
        </SliderTrack>
      </FormControl>

      <TextControl name="boxShadow" label="Box Shadow" />
    </>
  )
}

export default memo(EffectsPanel)
