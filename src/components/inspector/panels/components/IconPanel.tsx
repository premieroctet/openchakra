import { useSelector } from 'react-redux'
import { Select } from '@chakra-ui/react'
import React, { memo } from 'react'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import InputSuggestion from '~components/inspector/inputs/InputSuggestion'
import theme from '@chakra-ui/theme'
import { ComboboxOption } from '@reach/combobox'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import IconControl from '~components/inspector/controls/IconControl'
import { getPages } from '../../../../core/selectors/components'

const IconPanel = () => {
  const { setValueFromEvent } = useForm()
  const pages = useSelector(getPages)
  const page = usePropsSelector('page')

  const boxSize = usePropsSelector('boxSize')

  return (
    <>
      <IconControl label="Icon" name="icon" />

      <FormControl label="Size" htmlFor="boxSize">
        <InputSuggestion
          value={boxSize}
          handleChange={setValueFromEvent}
          name="boxSize"
        >
          {Object.keys(theme.sizes).map((option, index) => (
            <ComboboxOption key={index} value={option} />
          ))}
        </InputSuggestion>
      </FormControl>

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

      <ColorsControl withFullColor label="Color" name="color" enableHues />
    </>
  )
}

export default memo(IconPanel)
