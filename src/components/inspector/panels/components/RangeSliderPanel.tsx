import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import TextControl from '~components/inspector/controls/TextControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const RangeSliderPanel = () => {
  const { setValueFromEvent } = useForm()
  const orientation = usePropsSelector('orientation')

  return (
    <>
      <TextControl name="min" label="Min" />
      <TextControl name="max" label="Max" />
      <TextControl
        name="minStepsBetweenThumbs"
        label="Min Steps Between Thumbs"
      />
      <SwitchControl label="Reversed" name="isReversed" />
      <SwitchControl label="ReadOnly" name="isReadOnly" />

      <ColorsControl label="Color Scheme" name="colorScheme" />

      <FormControl htmlFor="orientation" label="Orientation">
        <Select
          id="orientation"
          onChange={setValueFromEvent}
          name="orientation"
          size="sm"
          value={orientation || ''}
        >
          <option>horizontal</option>
          <option>vertical</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(RangeSliderPanel)
