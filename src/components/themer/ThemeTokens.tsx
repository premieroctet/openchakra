import { Text, Divider, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import useDispatch from '~hooks/useDispatch'
import { NewThemeType } from '~core/models/customComponents'
import ParentColorPicker from './ParentColorPicker'

const ThemeTokens = ({ themeState }: { themeState: NewThemeType }) => {
  const dispatch = useDispatch()

  return (
    <VStack divider={<Divider />} alignItems="flex-start">
      <HStack spacing={4}>
        <Text>Primary Color</Text>
        <ParentColorPicker
          propType="primary"
          selectedColor={themeState.primary}
        />
      </HStack>
      <HStack spacing={4}>
        <Text>Secondary Color</Text>
        <ParentColorPicker
          propType="secondary"
          selectedColor={themeState.secondary}
        />
      </HStack>
      <HStack spacing={4}>
        <Text>Background Color</Text>
        <ParentColorPicker
          withFullColor={true}
          selectedColor={themeState.bgColor}
          propType="bgColor"
        />
      </HStack>
      <HStack spacing={4}>
        <Text>Paper Color</Text>
        <ParentColorPicker
          withFullColor={true}
          selectedColor={themeState.paperColor}
          propType="paperColor"
        />
      </HStack>
      <HStack spacing={4}>
        <Text>Text Color</Text>
        <ParentColorPicker
          withFullColor={true}
          selectedColor={themeState.textColor}
          propType="textColor"
        />
      </HStack>
      <HStack spacing={4}>
        <Text>Border Color</Text>
        <ParentColorPicker
          withFullColor={true}
          selectedColor={themeState.borderColor}
          propType="borderColor"
        />
      </HStack>
      <HStack spacing={4}>
        <Text>Error Color</Text>
        <ParentColorPicker
          withFullColor={true}
          selectedColor={themeState.errorColor}
          propType="errorColor"
        />
      </HStack>
      <HStack spacing={4}>
        <Text>Success Color</Text>
        <ParentColorPicker
          withFullColor={true}
          selectedColor={themeState.successColor}
          propType="successColor"
        />
      </HStack>
    </VStack>
  )
}

export default ThemeTokens
