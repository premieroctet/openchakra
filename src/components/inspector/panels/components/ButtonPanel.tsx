import { Select } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { memo } from 'react'

import { useForm } from '~hooks/useForm'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import FormControl from '~components/inspector/controls/FormControl'
import IconControl from '~components/inspector/controls/IconControl'
import SizeControl from '~components/inspector/controls/SizeControl'
import usePropsSelector from '~hooks/usePropsSelector'

import { getPages } from '../../../../core/selectors/components'

const ButtonPanel = () => {
  const { setValueFromEvent } = useForm()

  const pages = useSelector(getPages)
  const size = usePropsSelector('size')
  const page = usePropsSelector('page')
  const variant = usePropsSelector('variant')

  return (
    <>
      <ChildrenControl />

      <SizeControl name="size" label="Size" value={size} />

      <FormControl htmlFor="page" label="Ouvrir page">
        <Select
          id="page"
          onChange={setValueFromEvent}
          name="page"
          size="sm"
          value={page || ''}
        >
          <option value=""></option>
          {Object.values(pages).map((p, i) => (
            <option key={i} value={p.pageId}>
              {p.pageName}
            </option>
          ))}
        </Select>
      </FormControl>

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

      <ColorsControl label="Color Scheme" name="colorScheme" />
      <IconControl label="Left icon" name="leftIcon" />
      <IconControl label="Right icon" name="rightIcon" />
    </>
  )
}

export default memo(ButtonPanel)
