import {
  Button,
  Divider,
  HStack,
  Link,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NewThemeType } from '~core/models/customComponents'
import useDispatch from '~hooks/useDispatch'

const ThemeFonts = ({ themeState }: { themeState: NewThemeType }) => {
  const dispatch = useDispatch()
  const [fonts, setFonts] = useState([])
  const fontSourceURL =
    'https://api.fontsource.org/v1/fonts?subsets=latin&type=google&styles=normal&weights=400'

  useEffect(() => {
    const loadFonts = async () => {
      const loadedFonts = await axios.get(fontSourceURL).then(res => res.data)
      setFonts(
        loadedFonts.map((element: any) => ({
          label: element.family,
          value: element.id,
        })),
      )
    }
    loadFonts()
  }, [])

  return (
    <VStack divider={<Divider />} alignItems="stretch">
      <Text>
        View font previews{' '}
        <Link href="https://fontsource.org/fonts" target="_blank" color="blue">
          here
        </Link>
      </Text>

      <HStack spacing={4}>
        <Text>Heading Font Family</Text>
        <Select
          size="sm"
          width="20%"
          onChange={e => {
            dispatch.customComponents.updateNewTheme(
              'headingFontFamily',
              e.target.value,
            )
          }}
          value={themeState.headingFontFamily}
        >
          {fonts.length ? (
            fonts.map((font: any) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </Select>
        <Text>Applies font family to all headings</Text>
      </HStack>
      <HStack spacing={4}>
        <Text>Body Font Family</Text>
        <Select
          size="sm"
          width="20%"
          onChange={e => {
            dispatch.customComponents.updateNewTheme(
              'bodyFontFamily',
              e.target.value,
            )
          }}
          value={themeState.bodyFontFamily}
        >
          {fonts.length ? (
            fonts.map((font: any) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </Select>
        <Text>Applies font family to the body</Text>
      </HStack>
    </VStack>
  )
}

export default ThemeFonts
