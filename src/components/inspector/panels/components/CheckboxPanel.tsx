import React, { memo } from 'react'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import { useForm } from '~hooks/useForm'
import FormControl from '~components/inspector/controls/FormControl'
import { Select } from '@chakra-ui/react'
import usePropsSelector from '~hooks/usePropsSelector'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const CheckboxPanel = () => {
  const { setValueFromEvent } = useForm()
  const size = usePropsSelector('size')

  return (
    <>
      <ChildrenControl />
      <SwitchControl label="Checked" name="isChecked" />
      <ColorsControl label="Color Scheme" name="colorScheme" />
      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={size || 'md'}
          onChange={setValueFromEvent}
        >
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(CheckboxPanel)
