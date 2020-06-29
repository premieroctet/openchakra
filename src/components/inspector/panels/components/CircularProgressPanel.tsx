import React, { memo } from 'react'
import { SliderTrack, SliderFilledTrack } from '@chakra-ui/core'
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
        <SliderTrack
          onChange={value => setValue('value', value)}
          min={0}
          max={100}
          step={1}
          value={value || 100}
        >
          <SliderFilledTrack />
        </SliderTrack>
      </FormControl>

      <TextControl name="size" label="Size" />

      <FormControl label="Thickness">
        <SliderTrack
          onChange={value => setValue('thickness', value)}
          min={0.1}
          max={1}
          step={0.1}
          defaultValue={thickness}
        >
          <SliderFilledTrack />
        </SliderTrack>
      </FormControl>

      <ColorsControl label="Color" name="color" />

      <SwitchControl label="Loading" name="isIndeterminate" />
    </>
  )
}

export default memo(CircularProgressPanel)
