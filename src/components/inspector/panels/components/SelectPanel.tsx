import React, { memo } from 'react'
import { Select, Icon } from '@chakra-ui/core'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import SwitchControl from '../../controls/SwitchControl'
import InputSuggestion from '../../inputs/InputSuggestion'
import theme from '../../../../theme/theme'
import { ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import { Icons } from '@chakra-ui/core/dist/theme/icons'

const SelectPanel = () => {
  const { setValueFromEvent } = useForm()

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
            .filter(icon => icon.includes(icon) || !icon)
            .map((icon, index) => (
              <ComboboxOption key={index} value={icon}>
                <Icon name={icon as Icons} /> <ComboboxOptionText />
              </ComboboxOption>
            ))}
        </InputSuggestion>
      </FormControl>

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
      <SwitchControl label="Required" name="isRequired" />
      <SwitchControl label="Read Only" name="isReadOnly" />
    </>
  )
}

export default memo(SelectPanel)
