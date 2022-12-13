import React, { memo } from 'react'
import { Select, Input } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import SizeControl from '~components/inspector/controls/SizeControl'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import TextControl from '~components/inspector/controls/TextControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const RangeSliderPanel = () => {
  const { setValueFromEvent } = useForm()
  const orientation = usePropsSelector('orientation')
  const label = usePropsSelector('aria-label')

  return (
    <>
      <TextControl name="defaultvalue" label="Value" />
      <TextControl name="min" label="Min" />
      <TextControl name="max" label="Max" />
      <TextControl name="minStepsBetweenThumbs" label="Min Steps Between Thumbs" />
      <SwitchControl label="Reversed" name="isReversed" />
      <SwitchControl label="ReadOnly" name="isReadOnly" />

      <FormControl label="Aria Label">
        <Input
          size="sm"
          value={label || ''}
          type="text"
          name="aria-label"
          onChange={setValueFromEvent}
        />
      </FormControl>

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