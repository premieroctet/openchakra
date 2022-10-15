import React, { memo } from 'react'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'

const ConditionalPanel = () => {
  const { setValueFromEvent } = useForm()
  const show = usePropsSelector('show')

  return (
    <>
      <SwitchControl label="condition" name="condition" />
      <FormControl htmlFor="show" label="show">
        <Select
          id="show"
          onChange={setValueFromEvent}
          name="show"
          size="sm"
          value={show || 'show-both'}
        >
          <option>show-both</option>
          <option>show-true</option>
          <option>show-false</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(ConditionalPanel)