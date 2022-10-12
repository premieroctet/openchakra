import { Select } from '@chakra-ui/react'
import React, { memo } from 'react'

import { useForm } from '~hooks/useForm'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import FormControl from '~components/inspector/controls/FormControl'
import IconControl from '~components/inspector/controls/IconControl'
import SizeControl from '~components/inspector/controls/SizeControl'
import usePropsSelector from '~hooks/usePropsSelector'

const ButtonPanel = () => {
  const { setValueFromEvent } = useForm()

  const size = usePropsSelector('size')
  const variant = usePropsSelector('variant')

  return (
    <>
      <ChildrenControl />

      <SizeControl name="size" label="Size" value={size} />

      <FormControl htmlFor="variant" label="Variant">
        <Select
          id="variant"
          onChange={setValueFromEvent}
          name="variant"
          size="sm"
          value={variant || ''}
        >
          <option>outline</option>
          <option>ghost</option>
          <option>unstyled</option>
          <option>link</option>
          <option>solid</option>
        </Select>
      </FormControl>

      <ColorsControl label="Color Scheme" name="colorScheme" />
      <IconControl label="Left icon" name="leftIcon" />
      <IconControl label="Right icon" name="rightIcon" />
    </>
  )
}

export default memo(ButtonPanel)
