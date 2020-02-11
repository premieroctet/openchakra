import React, { memo } from 'react'
import SwitchControl from '../../controls/SwitchControl'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import { useForm } from '../../../../hooks/useForm'
import FormControl from '../../controls/FormControl'
import NumberControl from '../../controls/NumberControl'
import { Select } from '@chakra-ui/core'

const PopoverPanel = () => {
  const { setValueFromEvent } = useForm()
  const trigger = usePropsSelector('trigger')
  const placement = usePropsSelector('placement')

  return (
    <>
      <SwitchControl label="Is open" name="isOpen" />
      <SwitchControl label="Default Is Open" name="defaultIsOpen" />
      <FormControl label="trigger" htmlFor="trigger">
        <Select
          name="trigger"
          id="trigger"
          size="sm"
          value={trigger || 'click'}
          onChange={setValueFromEvent}
        >
          <option>hover</option>
          <option>click</option>
        </Select>
      </FormControl>
      <FormControl label="Placement" htmlFor="placement">
        <Select
          name="placement"
          id="placement"
          size="sm"
          value={placement || 'bottom'}
          onChange={setValueFromEvent}
        >
          <option>top</option>
          <option>bottom</option>
          <option>left</option>
          <option>right</option>
        </Select>
      </FormControl>
      <SwitchControl label="Return Focus On Close" name="returnFocusOnClose" />
      <SwitchControl label="Close On Blur" name="closeOnBlur" />
      <SwitchControl label="Close On Esc" name="closeOnEsc" />
      <NumberControl name="gutter" label="Gutter" />
      <SwitchControl label="Use Portal" name="usePortal" />
    </>
  )
}

export default memo(PopoverPanel)
