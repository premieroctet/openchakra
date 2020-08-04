import React, { ReactNode } from 'react'
import { Icon, useTheme } from '@chakra-ui/core'
import FormControl from './FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import InputSuggestion from '~components/inspector/inputs/InputSuggestion'
import { ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import { Icons } from '@chakra-ui/core/dist/theme/icons'

type IconControlProps = {
  name: string
  label: string | ReactNode
}

const IconControl: React.FC<IconControlProps> = ({ name, label }) => {
  const { setValueFromEvent } = useForm()
  const theme = useTheme()
  const value = usePropsSelector(name)

  return (
    <FormControl label={label} htmlFor={name}>
      <InputSuggestion
        value={value}
        handleChange={setValueFromEvent}
        name={name}
      >
        {Object.keys(theme.icons)
          .filter(icon => icon.includes(value) || !value)
          .map((icon, index) => (
            <ComboboxOption key={index} value={icon}>
              <Icon name={icon as Icons} /> <ComboboxOptionText />
            </ComboboxOption>
          ))}
      </InputSuggestion>
    </FormControl>
  )
}

export default IconControl
