import React, { memo } from 'react'
import { Select, Input } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const PopoverPanel = () => {
  const { setValueFromEvent } = useForm()
  const placement = usePropsSelector('placement')

  return (
    <>
      <SwitchControl label="Open" name="isOpen" />
      <SwitchControl label="Show Popover" name="showpreview" />
      <FormControl htmlFor="placement" label="Placement">
        <Select
          id="placement"
          onChange={setValueFromEvent}
          name="placement"
          size="sm"
          value={placement || ''}
        >
          <option>bottom</option>
          <option>top</option>
          <option>right</option>
          <option>auto</option>
          <option>left</option>
          <option>auto-start</option>
          <option>top-start</option>
          <option>right-start</option>
          <option>bottom-start</option>
          <option>left-start</option>
          <option>auto-end</option>
          <option>top-end</option>
          <option>right-end</option>
          <option>bottom-end</option>
          <option>left-end</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(PopoverPanel)
