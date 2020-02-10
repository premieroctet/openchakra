import React, { memo } from 'react'
import InputSuggestion from '../../inputs/InputSuggestion'
import { Icon, useTheme } from '@chakra-ui/core'
import { Icons } from '@chakra-ui/core/dist/theme/icons'
import { ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import ColorsControl from '../../controls/ColorsControl'

const ListIconPanel = () => {
  const { setValueFromEvent } = useForm()
  const theme = useTheme()
  const icon = usePropsSelector('icon')

  return (
    <>
      <FormControl label="Icon" htmlFor="icon">
        <InputSuggestion
          value={icon}
          handleChange={setValueFromEvent}
          name="icon"
        >
          {Object.keys(theme.icons)
            .filter(i => i.includes(icon) || !icon)
            .map((icon, index) => (
              <ComboboxOption key={index} value={icon}>
                <Icon name={icon as Icons} /> <ComboboxOptionText />
              </ComboboxOption>
            ))}
        </InputSuggestion>
      </FormControl>
      <ColorsControl name="color" label="Color" />
    </>
  )
}

export default memo(ListIconPanel)
