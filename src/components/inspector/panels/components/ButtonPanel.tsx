import React, { memo } from 'react'
import ColorsControl from '../../controls/ColorsControl'
import SizeControl from '../../controls/SizeControl'
import { Select } from '@chakra-ui/core'
import ChildrenControl from '../../controls/ChildrenControl'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import IconControl from '../../controls/IconControl'

const ButtonPanel = () => {
  const { setValueFromEvent } = useForm()

  const size = usePropsSelector('size')
  const variant = usePropsSelector('variant')

  return (
    <>
      <ChildrenControl />

      <SizeControl name="size" label="Size" value={size} />

      <FormControl htmlFor="variant" label="Variant">
        <Select
          id="variant"
          onChange={setValueFromEvent}
          name="variant"
          size="sm"
          value={variant || ''}
        >
          <option>outline</option>
          <option>ghost</option>
          <option>unstyled</option>
          <option>link</option>
          <option>solid</option>
        </Select>
      </FormControl>

      <ColorsControl label="Variant Color" name="variantColor" />
      <IconControl label="Left icon" name="leftIcon" />
      <IconControl label="Right icon" name="rightIcon" />
    </>
  )
}

export default memo(ButtonPanel)
