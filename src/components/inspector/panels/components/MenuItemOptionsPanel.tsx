import React, { memo } from 'react'
import TextControl from '~components/inspector/controls/TextControl'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import IconControl from '~components/inspector/controls/IconControl'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'

const MenuItemOptionsPanel = () => {
  const { setValueFromEvent } = useForm()
  const type = usePropsSelector('type')

  return (
    <>
      <TextControl name="value" label="Value" />
      <ChildrenControl />
      <IconControl name="icon" label="Icon" />
      <TextControl name="iconSpacing" label="Icon Spacing" />
      <SwitchControl label="Disabled" name="isDisabled" />
      <SwitchControl label="Checked" name="isChecked" />
      <FormControl htmlFor="type" label="Type">
        <Select
          id="type"
          onChange={setValueFromEvent}
          name="type"
          size="sm"
          value={type || ''}
        >
          <option>radio</option>
          <option>checkbox</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(MenuItemOptionsPanel)
