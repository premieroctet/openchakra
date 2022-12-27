import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import TextControl from '~components/inspector/controls/TextControl'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'

const MenuOptionsGroupPanel = () => {
  const { setValueFromEvent } = useForm()
  const type = usePropsSelector('type')

  return (
    <>
      <TextControl name="title" label="Title" />

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

export default memo(MenuOptionsGroupPanel)
