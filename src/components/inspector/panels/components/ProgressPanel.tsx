import React from 'react'
import { SliderTrack, SliderFilledTrack } from '@chakra-ui/core'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import SizeControl from '~components/inspector/controls/SizeControl'
import usePropsSelector from '~hooks/usePropsSelector'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const ProgressPanel = () => {
  const { setValue } = useForm()

  const value = usePropsSelector('value')
  const size = usePropsSelector('size')

  return (
    <>
      <FormControl label="Value">
        <SliderTrack
          onChange={value => setValue('value', value)}
          min={0}
          max={100}
          step={1}
          defaultValue={value}
        >
          <SliderFilledTrack />
        </SliderTrack>
      </FormControl>

      <SwitchControl label="Has stripe" name="hasStripe" />
      <SwitchControl label="Is animated" name="isAnimated" />

      <ColorsControl label="Color Scheme" name="colorScheme" />

      <SizeControl label="Size" options={['sm', 'md', 'lg']} value={size} />
    </>
  )
}

export default ProgressPanel
