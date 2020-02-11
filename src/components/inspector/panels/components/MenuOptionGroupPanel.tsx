import React from 'react'
import FormControl from '../../controls/FormControl'
import { Input, Select } from '@chakra-ui/core'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'

const MenuOptionGroupPanel = () => {
  const { setValueFromEvent } = useForm()
  const title = usePropsSelector('title')
  const type = usePropsSelector('type')

  return (
    <>
      <FormControl label="Title">
        <Input
          size="sm"
          value={title || 'Title'}
          type="text"
          name="title"
          onChange={setValueFromEvent}
        />
      </FormControl>
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

export default MenuOptionGroupPanel
