import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'

const TableCaptionPanel = () => {
  const { setValueFromEvent } = useForm()
  const placement = usePropsSelector('placement')

  return (
    <>
      <FormControl label="Placement" htmlFor="placement">
        <Select
          name="placement"
          id="placement"
          size="sm"
          value={placement || 'bottom'}
          onChange={setValueFromEvent}
        >
          <option>top</option>
          <option>bottom</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(TableCaptionPanel)
