import React, { useState, ReactNode } from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
} from '@reach/combobox'
import { Input } from '@chakra-ui/react'
import { useForm } from '~hooks/useForm'

type FormControlPropType = {
  handleChange: any
  value: any
  name: string
  children: ReactNode
}

const ltrim = (value: string | number): string | undefined => {
  if (!value) return
  if (typeof value === 'number') return `${value}`
  return value.replace(/^\s+/g, '')
}

const InputSuggestion: React.FC<FormControlPropType> = ({
  handleChange,
  name,
  value,
  children,
}) => {
  const { setValue } = useForm()
  const [isFocus, setIsFocus] = useState(false)

  return (
    <Combobox
      openOnFocus
      onSelect={item => {
        console.log('onSelect', name, item)
        setValue(name, item)
      }}
    >
      <ComboboxInput
        onFocus={() => setIsFocus(true)}
        id={name}
        value={ltrim(value)}
        name={name}
        onChange={e => {
          console.log('de lautr', e)
          handleChange(e)}}
        as={Input}
        aria-labelledby={name}
        size="sm"
        autoComplete="off"
      />

      {isFocus && (
        <ComboboxPopover>
          <ComboboxList
            style={{ maxHeight: 200, overflow: 'scroll' }}
            aria-labelledby={name}
            onClick={(e) => console.log(e)}
          >
            {children}
          </ComboboxList>
        </ComboboxPopover>
      )}
    </Combobox>
  )
}

export default InputSuggestion
