import React, { memo } from 'react'
import ColorsControl from '../../controls/ColorsControl'
import InputSuggestion from '../../inputs/InputSuggestion'
import theme from '../../../../theme/theme'
import { ComboboxOption } from '@reach/combobox'
import FormControl from '../../controls/FormControl'
import { useForm } from '../../../../hooks/useForm'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import IconControl from '../../controls/IconControl'

const IconPanel = () => {
  const { setValueFromEvent } = useForm()

  const fontSize = usePropsSelector('fontSize')

  return (
    <>
      <IconControl label="Icon" name="name" />

      <FormControl label="Font size" htmlFor="fontSize">
        <InputSuggestion
          value={fontSize}
          handleChange={setValueFromEvent}
          name="fontSize"
        >
          {Object.keys(theme.fontSizes).map((option, index) => (
            <ComboboxOption key={index} value={option} />
          ))}
        </InputSuggestion>
      </FormControl>

      <ColorsControl withFullColor label="Color" name="color" enableHues />
    </>
  )
}

export default memo(IconPanel)
