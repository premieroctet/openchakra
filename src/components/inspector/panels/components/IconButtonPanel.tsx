import React, { memo } from 'react'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import VariantsControl from '~components/inspector/controls/VariantsControl'
import SizeControl from '~components/inspector/controls/SizeControl'
import usePropsSelector from '~hooks/usePropsSelector'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import IconControl from '~components/inspector/controls/IconControl'
import FormControl from '~components/inspector/controls/FormControl'
import { Select } from '@chakra-ui/react'
import { useForm } from '~hooks/useForm'
import { useSelector } from 'react-redux'
import { getPages } from '~core/selectors/components'

const IconButtonPanel = () => {
  const pages = useSelector(getPages)
  const page = usePropsSelector('page')
  const size = usePropsSelector('size')
  const variant = usePropsSelector('variant')
  const { setValueFromEvent } = useForm()

  return (
    <>
      <IconControl name="icon" label="Icon" />
      <SizeControl name="size" label="Size" value={size} />
      <ColorsControl label="Color" name="colorScheme" />
      <SwitchControl label="Loading" name="isLoading" />
      <SwitchControl label="Round" name="isRound" />
      <VariantsControl label="Variant" name="variant" value={variant} />
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
    </>
  )
}

export default memo(IconButtonPanel)
