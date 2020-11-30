import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import { useForm } from '~hooks/useForm'
import FormControl from '~components/inspector/controls/FormControl'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import usePropsSelector from '~hooks/usePropsSelector'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const HeadingPanel = () => {
  const { setValueFromEvent } = useForm()

  const size = usePropsSelector('size')
  const as = usePropsSelector('as')

  return (
    <>
      <ChildrenControl />
      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={size}
          onChange={setValueFromEvent}
        >
          <option>xs</option>
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
          <option>xl</option>
          <option>2xl</option>
        </Select>
      </FormControl>
      <FormControl label="As">
        <Select
          size="sm"
          value={as || ''}
          onChange={setValueFromEvent}
          name="as"
        >
          <option>h1</option>
          <option>h2</option>
          <option>h3</option>
          <option>h4</option>
          <option>h5</option>
          <option>h6</option>
        </Select>
      </FormControl>

      <SwitchControl label="Truncated" name="isTruncated" />
    </>
  )
}

export default memo(HeadingPanel)
