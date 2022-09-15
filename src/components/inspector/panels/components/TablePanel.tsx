import { Select } from '@chakra-ui/react'
import { memo } from 'react'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import FormControl from '~components/inspector/controls/FormControl'
import TextControl from '~components/inspector/controls/TextControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'

const TablePanel = () => {
  const { setValueFromEvent } = useForm()

  const variant = usePropsSelector('variant')
  const size = usePropsSelector('size')

  return (
    <>
      <ColorsControl label="Color Scheme" name="colorScheme" />

      <FormControl label="Variant" htmlFor="variant">
        <Select
          name="variant"
          id="variant"
          size="sm"
          value={variant || ''}
          onChange={setValueFromEvent}
        >
          <option>simple</option>
          <option>striped</option>
          <option>unstyled</option>
        </Select>
      </FormControl>

      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={size || ''}
          onChange={setValueFromEvent}
        >
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(TablePanel)
