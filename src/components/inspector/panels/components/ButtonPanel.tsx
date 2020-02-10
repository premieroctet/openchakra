import React, { memo } from 'react'
import { Icons } from '@chakra-ui/core/dist/theme/icons'

import ColorsControl from '../../controls/ColorsControl'
import SizeControl from '../../controls/SizeControl'
import { Icon, Select, useTheme } from '@chakra-ui/core'
import ChildrenControl from '../../controls/ChildrenControl'
import InputSuggestion from '../../inputs/InputSuggestion'
import { ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'

const ButtonPanel = () => {
  const { setValueFromEvent } = useForm()
  const theme = useTheme()

  const size = usePropsSelector('size')
  const variant = usePropsSelector('variant')
  const leftIcon = usePropsSelector('leftIcon')
  const rightIcon = usePropsSelector('rightIcon')

  return (
    <>
      <ChildrenControl />

      <SizeControl name="size" label="Size" value={size} />

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

      <ColorsControl label="Variant Color" name="variantColor" />

      <FormControl label="Left icon" htmlFor="leftIcon">
        <InputSuggestion
          value={leftIcon}
          handleChange={setValueFromEvent}
          name="leftIcon"
        >
          {Object.keys(theme.icons)
            .filter(icon => icon.includes(leftIcon) || !leftIcon)
            .map((icon, index) => (
              <ComboboxOption key={index} value={icon}>
                <Icon name={icon as Icons} /> <ComboboxOptionText />
              </ComboboxOption>
            ))}
        </InputSuggestion>
      </FormControl>

      <FormControl label="Right icon" htmlFor="rightIcon">
        <InputSuggestion
          value={rightIcon}
          handleChange={setValueFromEvent}
          name="rightIcon"
        >
          {Object.keys(theme.icons)
            .filter(icon => icon.includes(rightIcon) || !rightIcon)
            .map((icon, index) => (
              <ComboboxOption key={index} value={icon}>
                <Icon name={icon as Icons} /> <ComboboxOptionText />
              </ComboboxOption>
            ))}
        </InputSuggestion>
      </FormControl>
    </>
  )
}

export default memo(ButtonPanel)
