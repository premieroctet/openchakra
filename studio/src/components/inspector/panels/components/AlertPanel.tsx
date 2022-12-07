import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'

const AlertPanel = () => {
  const { setValueFromEvent } = useForm()
  const variant = usePropsSelector('variant')
  const status = usePropsSelector('status')

  return (
    <>
      <FormControl label="Status" htmlFor="status">
        <Select
          name="status"
          id="status"
          size="sm"
          value={status || 'info'}
          onChange={setValueFromEvent}
        >
          <option>error</option>
          <option>success</option>
          <option>warning</option>
          <option>info</option>
        </Select>
      </FormControl>

      <FormControl label="Variant" htmlFor="variant">
        <Select
          name="variant"
          id="variant"
          size="sm"
          value={variant || 'subtle'}
          onChange={setValueFromEvent}
        >
          <option>subtle</option>
          <option>solid</option>
          <option>left-accent</option>
          <option>top-accent</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(AlertPanel)
