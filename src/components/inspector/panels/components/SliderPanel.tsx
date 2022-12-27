import React, { memo } from 'react'
import { Select, Input } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import SizeControl from '~components/inspector/controls/SizeControl'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import TextControl from '~components/inspector/controls/TextControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const SliderPanel = () => {
  const { setValueFromEvent } = useForm()
  const size = usePropsSelector('size')
  const orientation = usePropsSelector('orientation')
  const label = usePropsSelector('aria-label')

  return (
    <>
      <TextControl name="value" label="Value" />
      <TextControl name="defaultValue" label="Default Value" />
      <TextControl name="min" label="Min" />
      <TextControl name="max" label="Max" />
      <TextControl name="step" label="Step" />

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

      <SizeControl label="Size" options={['sm', 'md', 'lg']} value={size} />

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

      <FormControl htmlFor="direction" label="Direction">
        <Select
          id="direction"
          onChange={setValueFromEvent}
          name="direction"
          size="sm"
          value={orientation || ''}
        >
          <option>ltr</option>
          <option>rtl</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(SliderPanel)
