import React, { ReactNode } from 'react'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import InputSuggestion from '~components/inspector/inputs/InputSuggestion'
import { ComboboxOption, ComboboxOptionText } from '@reach/combobox'
import icons from '~iconsList'
import lucideIcons from '~lucideiconsList'
import { useVirtual } from 'react-virtual'
import {
  FormLabel,
  FormControl,
  Grid,
  Box,
} from '@chakra-ui/react'


type IconControlProps = {
  name: string
  label: string | ReactNode
}

const IconControl: React.FC<IconControlProps> = ({ name, label }) => {
  const { setValueFromEvent } = useForm()
  const value = usePropsSelector(name)
  const parentRef = React.useRef()

  const rowVirtualizer = useVirtual({
    size: Object.keys(lucideIcons).length,
    parentRef,
    // estimateSize: React.useCallback(() => 35, []),
  })

  const whatIWant = Object.entries(lucideIcons)


  return (
    <FormControl 
    display="flex"
    justifyItems="center">
    <FormLabel
      p={0}
      mr={2}
      color="gray.500"
      lineHeight="1rem"
      width={'90px'}
      fontSize="xs"
      htmlFor={name}
    >
      {label}
    </FormLabel>
    <Box>
      <div
        ref={parentRef}
        label={label} 
        htmlFor={name} 
        className="List"
        style={{
          width: `150px`,
          height: `150px`,
          overflow: 'auto',
        }}
      >
        <div
          className="ListInner"
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          <InputSuggestion
            value={value}
            handleChange={setValueFromEvent}
            name={name}
          >
          {rowVirtualizer.virtualItems.map(virtualRow => {
            const [iconName, IconComponent] = whatIWant[virtualRow.index] 
              
            return (
            <ComboboxOption 
              value={iconName}
              key={virtualRow.index}
              className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
               <IconComponent />
               <ComboboxOptionText />
            </ComboboxOption>
          )
          })}
          </InputSuggestion>
        </div>
      </div>
      </Box>
    </FormControl>

  )

  return (
    <FormControl 
      ref={parentRef} 
      label={label} 
      htmlFor={name} 
      style={{
        height: `150px`,
        width: `300px`,
        overflow: 'auto',
      }}
    >
      <div 
        className="ListInner"
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: '100%',
          position: 'relative',
        }}

>
      <InputSuggestion
        value={value}
        handleChange={setValueFromEvent}
        name={name}
      >
        {rowVirtualizer.virtualItems.map((virtualRow, index) => {
            const [iconName, IconComponent] = whatIWant[virtualRow.index] 
            
              return (
                <ComboboxOption 
                  key={virtualRow.index}
                  ref={virtualRow.measureRef} 
                  value={iconName}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <IconComponent />
                  <ComboboxOptionText />
                </ComboboxOption>
              )

          })}
      </InputSuggestion>
      </div>
    </FormControl>
  )
}

export default IconControl
