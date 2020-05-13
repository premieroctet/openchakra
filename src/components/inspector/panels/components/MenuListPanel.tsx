import React from 'react'
import FormControl from '../../controls/FormControl'
import { Select } from '@chakra-ui/core'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'

const MenuListPanel = () => {
  const { setValueFromEvent } = useForm()
  const placement = usePropsSelector('placement')

  return (
    <>
      <FormControl label="Placement" htmlFor="placement">
        <Select
          name="placement"
          id="placement"
          size="sm"
          value={placement || 'placement'}
          onChange={setValueFromEvent}
        >
          <option>auto</option>
          <option>top</option>
          <option>right</option>
          <option>bottom</option>
          <option>left</option>
        </Select>
      </FormControl>
    </>
  )
}

export default MenuListPanel
