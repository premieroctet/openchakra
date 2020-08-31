import React, { memo } from 'react'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import InputSuggestion from '~components/inspector/inputs/InputSuggestion'
import theme from '@chakra-ui/theme'
import { ComboboxOption } from '@reach/combobox'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import IconControl from '~components/inspector/controls/IconControl'

const IconPanel = () => {
  const { setValueFromEvent } = useForm()

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

      <ColorsControl withFullColor label="Color" name="color" enableHues />
    </>
  )
}

export default memo(IconPanel)
