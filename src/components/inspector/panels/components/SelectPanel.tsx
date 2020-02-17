import React, { memo } from 'react'
import { Select, Icon, useTheme } from '@chakra-ui/core'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import SwitchControl from '../../controls/SwitchControl'
import InputSuggestion from '../../inputs/InputSuggestion'
import { ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import { Icons } from '@chakra-ui/core/dist/theme/icons'
import TextControl from '../../controls/TextControl'

const SelectPanel = () => {
  const { setValueFromEvent } = useForm()
  const theme = useTheme()

  const size = usePropsSelector('size')
  const icon = usePropsSelector('icon')
  const variant = usePropsSelector('variant')

  return (
    <>
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

      <FormControl label="Icon" htmlFor="icon">
        <InputSuggestion
          value={icon}
          handleChange={setValueFromEvent}
          name="icon"
        >
          {Object.keys(theme.icons)
            .filter(item => item.includes(icon) || !icon)
            .map((item, index) => (
              <ComboboxOption key={index} value={item}>
                <Icon name={item as Icons} /> <ComboboxOptionText />
              </ComboboxOption>
            ))}
        </InputSuggestion>
      </FormControl>

      <TextControl label="Icon size" name="iconSize" />

      <FormControl label="variant" htmlFor="variant">
        <Select
          name="variant"
          id="variant"
          size="sm"
          value={variant}
          onChange={setValueFromEvent}
        >
          <option>outline</option>
          <option>unstyled</option>
          <option>flushed</option>
          <option>filled</option>
        </Select>
      </FormControl>

      <SwitchControl label="Invalid" name="isInvalid" />
      <SwitchControl label="Read Only" name="isReadOnly" />
    </>
  )
}

export default memo(SelectPanel)
