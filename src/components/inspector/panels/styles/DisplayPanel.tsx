import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import FlexPanel from './FlexPanel'

const DisplayPanel = () => {
  const { setValueFromEvent } = useForm()
  const display = usePropsSelector('display')

  return (
    <>
      <FormControl label="Display" htmlFor="display">
        <Select
          size="sm"
          value={display || ''}
          onChange={setValueFromEvent}
          name="display"
          borderColor="gray.200"
        >
          <option>block</option>
          <option>flex</option>
          <option>inline</option>
          <option>grid</option>
          <option>inline-block</option>
        </Select>
      </FormControl>

      {display === 'flex' && <FlexPanel />}
    </>
  )
}

export default memo(DisplayPanel)
