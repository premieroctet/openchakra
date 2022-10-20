import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'

const TablePanel = () => {
  const { setValueFromEvent } = useForm()
  const variant = usePropsSelector('variant')
  const size = usePropsSelector('size')

  return (
    <>
      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={size || 'md'}
          onChange={setValueFromEvent}
        >
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </Select>
      </FormControl>

      <FormControl label="Variant" htmlFor="variant">
        <Select
          name="variant"
          id="variant"
          size="sm"
          value={variant || 'simple'}
          onChange={setValueFromEvent}
        >
          <option>simple</option>
          <option>striped</option>
          <option>unstyled</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(TablePanel)
