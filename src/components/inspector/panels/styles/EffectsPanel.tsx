import React, { memo, useMemo } from 'react'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import {
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/core'

const EffectsPanel = () => {
  const { setValueFromEvent, setValue } = useForm()
  const opacity = usePropsSelector('opacity')
  const shadow = usePropsSelector('shadow')

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
      <FormControl label="Box shadow">
        <Select
          size="sm"
          value={shadow}
          onChange={setValueFromEvent}
          name="shadow"
        >
          <option>xs</option>
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(EffectsPanel)
