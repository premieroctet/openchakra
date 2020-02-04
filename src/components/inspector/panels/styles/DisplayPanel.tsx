import React, { memo } from 'react'
import { Select } from '@chakra-ui/core'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import FlexPanel from './FlexPanel'

const DisplayPanel = () => {
  const { setValueFromEvent } = useForm()
  const display = usePropsSelector('display')
  console.log(display)
  return (
    <>
      <FormControl label="Display">
        <Select
          size="sm"
          value={display || ''}
          onChange={setValueFromEvent}
          name="display"
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
