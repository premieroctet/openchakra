import React from 'react'
import FormControl from '../../controls/FormControl'
import { Select } from '@chakra-ui/core'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'

const MenuItemOptionPanel = () => {
  const { setValueFromEvent } = useForm()
  const type = usePropsSelector('type')

  return (
    <>
      <FormControl label="Type" htmlFor="type">
        <Select
          name="type"
          id="type"
          size="sm"
          value={type || 'type'}
          onChange={setValueFromEvent}
        >
          <option>radio</option>
          <option>checkbox</option>
        </Select>
      </FormControl>
    </>
  )
}

export default MenuItemOptionPanel
