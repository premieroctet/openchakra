import React, { memo } from 'react'
import { Select, Input } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const TooltipPanel = () => {
  const { setValueFromEvent } = useForm()
  const label = usePropsSelector('label')
  const ariaLabel = usePropsSelector('aria-label')
  const placement = usePropsSelector('placement')

  return (
    <>
      <SwitchControl label="Has Arrow" name="hasArrow" />

      <FormControl htmlFor="placement" label="Placement">
        <Select
          id="placement"
          onChange={setValueFromEvent}
          name="placement"
          size="sm"
          value={placement || ''}
        >
          <option>auto</option>
          <option>top</option>
          <option>right</option>
          <option>bottom</option>
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
      <FormControl label="Label">
        <Input
          size="sm"
          value={label || ''}
          type="text"
          name="label"
          onChange={setValueFromEvent}
        />
      </FormControl>
      <FormControl label="Aria Label">
        <Input
          size="sm"
          value={ariaLabel || ''}
          type="text"
          name="aria-label"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  )
}

export default memo(TooltipPanel)
