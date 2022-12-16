import { Text, Divider, HStack, VStack, GridItem, Grid } from '@chakra-ui/react'
import React from 'react'
import useDispatch from '~hooks/useDispatch'
import { NewThemeType } from '~core/models/customComponents'
import ParentColorPicker from './ParentColorPicker'

const paletteOptions = [
  {
    label: 'Brand ColorScheme',
    propType: 'brand',
    description: 'Set the brand color scheme for your project',
    withFullColor: false,
  },
  {
    label: 'Primary Color',
    propType: 'primaryColor',
    description: 'Applies this as foreground color to blah blah components',
    withFullColor: true,
  },
  {
    label: 'Background Color',
    propType: 'bgColor',
    description: 'Applies this as body background color ',
    withFullColor: true,
  },
  {
    label: 'Paper Color',
    propType: 'paperColor',
    description: 'Applies this as component background color ',
    withFullColor: true,
  },
  {
    label: 'Text Color',
    propType: 'textColor',
    description: 'Applies this as text color ',
    withFullColor: true,
  },
  {
    label: 'Border Color',
    propType: 'borderColor',
    description: 'Applies this as border color ',
    withFullColor: true,
  },
]

const PaletteOption = ({
  label,
  themeState,
  propType,
  description,
  withFullColor,
}: {
  label: string
  themeState: any
  propType: string
  description: string
  withFullColor: boolean
}) => {
  return (
    <HStack spacing={4}>
      <Text>{label}</Text>
      <ParentColorPicker
        propType={propType}
        selectedColor={themeState[propType]}
        withFullColor={withFullColor}
      />
      <Text>{description}</Text>
    </HStack>
  )
}

const ThemeColorPalette = ({ themeState }: { themeState: NewThemeType }) => {
  return (
    <VStack divider={<Divider />} alignItems="flex-start">
      {paletteOptions.map(paletteOption => (
        <PaletteOption
          key={paletteOption.propType}
          label={paletteOption.label}
          themeState={themeState}
          propType={paletteOption.propType}
          description={paletteOption.description}
          withFullColor={paletteOption.withFullColor}
        />
      ))}
    </VStack>
  )
}

export default ThemeColorPalette
