import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import usePropsSelector from '~hooks/usePropsSelector'
import { useForm } from '~hooks/useForm'

const JustifyItems = () => {
  const { setValueFromEvent } = useForm()
  const justifyItems = usePropsSelector('justifyItems')

  return (
    <FormControl htmlFor="justifyItems" label="Justify">
      <Select
        id="justifyItems"
        onChange={setValueFromEvent}
        name="justifyItems"
        size="sm"
        value={justifyItems || ''}
      >
        <option></option>
        <option>start</option>
        <option>center</option>
        <option>end</option>
      </Select>
    </FormControl>
  )
}

export default memo(JustifyItems)
