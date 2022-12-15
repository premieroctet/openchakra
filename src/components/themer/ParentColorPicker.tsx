import ColorPicker from 'coloreact'
import {
  Box,
  Tooltip,
  IconButton,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Tab,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Grid,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import useDispatch from '~hooks/useDispatch'
import { themeColors } from '../editor/Editor'

const ColorSchemePicker = ({
  propType,
  withFullColor = false,
}: {
  propType: string
  withFullColor?: boolean
}) => {
  const dispatch = useDispatch()
  const [hue, setHue] = useState(500)
  return (
    <>
      <Grid mb={2} templateColumns="repeat(5, 1fr)" gap={1}>
        {themeColors.map((themeColor: string) => {
          const fullThemeColor = withFullColor
            ? themeColor + '.' + hue
            : themeColor
          return (
            <Tooltip key={fullThemeColor} label={fullThemeColor}>
              <IconButton
                bg={`${themeColor}.${withFullColor ? hue : 500}`}
                mr={2}
                boxShadow="md"
                isRound
                aria-label="Color"
                size="xs"
                onClick={() => {
                  dispatch.customComponents.updateNewTheme(
                    propType,
                    fullThemeColor,
                  )
                }}
              />
            </Tooltip>
          )
        })}
      </Grid>
      {withFullColor && (
        <>
          <Slider
            onChange={value => {
              value = value === 0 ? 50 : value
              setHue(value)
            }}
            min={0}
            max={900}
            step={100}
            value={hue}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={8}>
              <Box borderRadius="full" fontSize="xs">
                {hue}
              </Box>
            </SliderThumb>
          </Slider>
        </>
      )}
    </>
  )
}

const ParentColorPicker = ({
  withFullColor = false,
  selectedColor,
  propType,
}: {
  withFullColor?: boolean
  selectedColor: string
  propType: string
}) => {
  const dispatch = useDispatch()

  let propsIconButton: any = { bg: selectedColor }
  if (!withFullColor) {
    propsIconButton = { colorScheme: selectedColor }
  }
  return (
    <>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            {...propsIconButton}
            mr={2}
            boxShadow="md"
            isRound
            aria-label="Color"
            size="sm"
          />
        </PopoverTrigger>
        <PopoverContent width={200} borderColor="gray.200">
          <PopoverArrow />
          <PopoverBody alignItems="center" justifyContent="center">
            {withFullColor ? (
              <Tabs size="sm" variant="soft-rounded" colorScheme="teal">
                <TabList>
                  <Tab>ColorScheme</Tab>
                  <Tab>All</Tab>
                </TabList>
                <TabPanels mt={4}>
                  <TabPanel p={0}>
                    <ColorSchemePicker propType={propType} withFullColor />
                  </TabPanel>

                  <TabPanel p={0}>
                    <Box position="relative" h={150} w={150}>
                      <ColorPicker
                        opacity
                        color={selectedColor.split('.')[0]}
                        onChange={(color: any) => {}}
                        onComplete={(color: any) => {
                          dispatch.customComponents.updateNewTheme(
                            propType,
                            color.rgbString,
                          )
                        }}
                      />
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            ) : (
              <ColorSchemePicker propType={propType} />
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Input
        width={200}
        size="sm"
        borderColor="gray.200"
        name="bgColor"
        onChange={e => {
          dispatch.customComponents.updateNewTheme(propType, e.target.value)
        }}
        value={selectedColor}
      />
    </>
  )
}

export default ParentColorPicker
