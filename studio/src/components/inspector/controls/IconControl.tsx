import React, { ReactNode } from 'react'
import FormControl from './FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import InputSuggestion from '~components/inspector/inputs/InputSuggestion'
import { ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import icons from '~iconsList'
import lucideIcons from '~lucideiconsList'


type IconControlProps = {
  name: string
  label: string | ReactNode
}

const IconControl: React.FC<IconControlProps> = ({ name, label }) => {
  const { setValue, setValueFromEvent } = useForm()
  const value = usePropsSelector(name)

  const lucideEntries = Object.entries(lucideIcons)

  const updateIcon  = (e) => {    
    setValue(name, e.target.value)
  }

  return (
    <FormControl label={label} htmlFor={name}>
      <InputSuggestion
        value={value}
        handleChange={updateIcon}
        name={name}
      >
        {(Object.keys(icons) as Array<keyof typeof icons>)
          .filter(icon => icon.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || !value)
          .map((icon, index) => {
            const IconComponent = icons[icon]
            return (
              <ComboboxOption 
                key={index} 
                value={icon} 
                onClick={() => setValue('data-lib', 'chakra')} 
              >
                <IconComponent
                  // @ts-ignore
                  path=""
                />
                <ComboboxOptionText />
              </ComboboxOption>
            )
          })}

          {(lucideEntries
            .filter(([iconName, IconComponent]) => iconName.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || !value)
            .map(([iconName, IconComponent]) => 
              <ComboboxOption 
                key={iconName} 
                value={iconName} 
                onClick={() => setValue('data-lib', 'lucid')} 
              >
                <IconComponent />
                <ComboboxOptionText />
              </ComboboxOption>
          ))}

          

          
      </InputSuggestion>
    </FormControl>
  )
}

export default IconControl
