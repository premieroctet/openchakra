import React, { memo } from 'react'
import TextControl from '../../controls/TextControl'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/core'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import SwitchControl from '../../controls/SwitchControl'

const BreadcrumbPanel = () => {
  const { setValue } = useForm()
  const value = usePropsSelector('value')
  return (
    <>
      <TextControl name="separator" label="Separator" />
      <FormControl label="Spacing">
        <Slider
          onChange={value => setValue('spacing', value)}
          min={0}
          max={100}
          step={1}
          defaultValue={value}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
      </FormControl>
      <SwitchControl label="add Separator" name="addSeparator" />
    </>
  )
}

export default memo(BreadcrumbPanel)
