import React, { memo } from 'react'
import ColorsControl from '../../controls/ColorsControl'
import InputSuggestion from '../../inputs/InputSuggestion'
import { Icon, useTheme } from '@chakra-ui/core'
import { Icons } from '@chakra-ui/core/dist/theme/icons'
import { ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import VariantsControl from '../../controls/VariantsControl'
import SizeControl from '../../controls/SizeControl'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import SwitchControl from '../../controls/SwitchControl'

const IconButtonPanel = () => {
  const { setValueFromEvent } = useForm()
  const theme = useTheme()

  const name = usePropsSelector('name')
  const size = usePropsSelector('size')
  const variant = usePropsSelector('variant')

  return (
    <>
      <FormControl label="Icon" htmlFor="icon">
        <InputSuggestion
          value={name}
          handleChange={setValueFromEvent}
          name="icon"
        >
          {Object.keys(theme.icons)
            .filter(icon => icon.includes(name) || !name)
            .map((icon, index) => (
              <ComboboxOption key={index} value={icon}>
                <Icon name={icon as Icons} /> <ComboboxOptionText />
              </ComboboxOption>
            ))}
        </InputSuggestion>
      </FormControl>

      <SizeControl name="size" label="Size" value={size} />

      <ColorsControl label="Color" name="variantColor" />

      <SwitchControl label="Loading" name="isLoading" />

      <SwitchControl label="Round" name="isRound" />

      <VariantsControl label="Variant" name="variant" value={variant} />
    </>
  )
}

export default memo(IconButtonPanel)
