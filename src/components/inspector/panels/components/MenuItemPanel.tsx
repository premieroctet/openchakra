import React from 'react'
import FormControl from '../../controls/FormControl'
import { Select } from '@chakra-ui/core'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'

const MenuItemPanel = () => {
  const { setValueFromEvent } = useForm()
  const role = usePropsSelector('role')

  return (
    <>
      <FormControl label="Role" htmlFor="role">
        <Select
          name="role"
          id="role"
          size="sm"
          value={role || 'role'}
          onChange={setValueFromEvent}
        >
          <option>menuitem</option>
          <option>menuitemradio</option>
          <option>menuitemcheckbox</option>
        </Select>
      </FormControl>
    </>
  )
}

export default MenuItemPanel
