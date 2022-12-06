import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import SizeControl from '~components/inspector/controls/SizeControl'

const CardPanel = () => {
  const { setValueFromEvent } = useForm()
  const size = usePropsSelector('size')
  const variant = usePropsSelector('variant')
  const align = usePropsSelector('align')
  const direction = usePropsSelector('direction')
  const maxW = usePropsSelector('maxW')

  return (
    <>
      <SizeControl label="Size" options={['md', 'sm', 'lg']} value={size} />
      <FormControl htmlFor="variant" label="Variant">
        <Select
          id="variant"
          onChange={setValueFromEvent}
          name="variant"
          size="sm"
          value={variant || ''}
        >
          <option>elevated</option>
          <option>outline</option>
          <option>filled</option>
          <option>unstyled</option>
        </Select>
      </FormControl>
      <FormControl htmlFor="align" label="Align">
        <Select
          id="align"
          onChange={setValueFromEvent}
          name="align"
          size="sm"
          value={align || ''}
        >
          <option>normal</option>
          <option>baseline</option>
          <option>center</option>
          <option>flex-end</option>
          <option>flex-start</option>
          <option>inherit</option>
          <option>initial</option>
          <option>revert</option>
          <option>revert-layer</option>
          <option>self-end</option>
          <option>end</option>
        </Select>
      </FormControl>
      <FormControl htmlFor="direction" label="Direction">
        <Select
          id="direction"
          onChange={setValueFromEvent}
          name="direction"
          size="sm"
          value={direction || ''}
        >
          <option>column</option>
          <option>column-reverse</option>
          <option>center</option>
          <option>row</option>
          <option>row-reverse</option>
          <option>inherit</option>
          <option>initial</option>
          <option>revert</option>
          <option>revert-layer</option>
          <option>unset</option>
        </Select>
      </FormControl>
      <FormControl htmlFor="maxW" label="Max Width">
        <Select
          id="maxW"
          onChange={setValueFromEvent}
          name="maxW"
          size="sm"
          value={maxW || ''}
        >
          <option>sm</option>
          <option>2xs</option>
          <option>xs</option>
          <option>md</option>
          <option>lg</option>
          <option>xl</option>
          <option>2xl</option>
          <option>full</option>
        </Select>
      </FormControl>
    </>
  )
}

export default memo(CardPanel)
