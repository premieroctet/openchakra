import React, { ChangeEvent } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  IconButton,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  Portal,
  useTheme,
} from '@chakra-ui/react'
import ColorPicker from 'coloreact'
import HuesPickerControl from './HuesPickerControl'
import { useForm } from '~hooks/useForm'
import omit from 'lodash/omit'
import usePropsSelector from '~hooks/usePropsSelector'

type ColorPickerPropType = {
  withFullColor?: boolean
  name: string
  gradient: boolean
  gradientColor?: string
  index?: number
  updateGradient?: (value: string, index: number) => Promise<void>
}

const ColorPickerControl = (props: ColorPickerPropType) => {
  const theme = useTheme()
  const themeColors: any = omit(theme.colors, [
    'transparent',
    'current',
    'black',
    'white',
  ])

  const { setValue, setValueFromEvent } = useForm()
  const value = usePropsSelector(props.name)

  let propsIconButton: any = { bg: value }
  if (value && themeColors[value]) {
    propsIconButton = { colorScheme: value }
  }

  return (
    <>
      <Popover placement="bottom">
        <PopoverTrigger>
          {props.gradient ? (
            <IconButton
              mr={2}
              boxShadow="md"
              border={props.gradientColor ? 'none' : '2px solid grey'}
              isRound
              aria-label="Color"
              size="xs"
              colorScheme={props.gradientColor}
              bg={props.gradientColor}
            />
          ) : (
            <IconButton
              mr={2}
              boxShadow="md"
              border={value ? 'none' : '2px solid grey'}
              isRound
              aria-label="Color"
              size="xs"
              {...propsIconButton}
            />
          )}
        </PopoverTrigger>
        <Portal>
          <PopoverContent width="200px">
            <PopoverArrow />
            <PopoverBody>
              {props.withFullColor ? (
                <Tabs size="sm" variant="soft-rounded" colorScheme="green">
                  <TabList>
                    <Tab>Theme</Tab>
                    <Tab>All</Tab>
                  </TabList>
                  <TabPanels mt={4}>
                    <TabPanel p={0}>
                      {props.gradient ? (
                        <HuesPickerControl
                          name={props.name}
                          themeColors={themeColors}
                          enableHues
                          setValue={setValue}
                          gradient={true}
                          index={props.index}
                          updateGradient={props.updateGradient}
                        />
                      ) : (
                        <HuesPickerControl
                          name={props.name}
                          themeColors={themeColors}
                          enableHues
                          setValue={setValue}
                          gradient={props.gradient}
                        />
                      )}
                    </TabPanel>

                    <TabPanel p={0}>
                      <Box position="relative" height="150px">
                        <ColorPicker
                          color={props.gradient ? props.gradientColor : value}
                          onChange={(color: any) => {
                            props.gradient
                              ? props.updateGradient!(
                                  `#${color.hex}`,
                                  props.index!,
                                )
                              : setValue(props.name, `#${color.hex}`)
                          }}
                        />
                        );
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              ) : props.gradient ? (
                <HuesPickerControl
                  name={props.name}
                  themeColors={themeColors}
                  enableHues
                  setValue={setValue}
                  gradient={true}
                  index={props.index}
                  updateGradient={props.updateGradient}
                />
              ) : (
                <HuesPickerControl
                  name={props.name}
                  themeColors={themeColors}
                  enableHues={false}
                  setValue={setValue}
                  gradient={props.gradient}
                />
              )}
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      {props.gradient ? (
        <Input
          width="100px"
          size="sm"
          name={props.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            props.gradient
              ? props.updateGradient!(e.target.value, props.index!)
              : setValue(props.name, e.target.value)
          }}
          value={props.gradientColor}
        />
      ) : (
        <Input
          width="100px"
          size="sm"
          name={props.name}
          onChange={setValueFromEvent}
          value={value}
        />
      )}
    </>
  )
}

export default ColorPickerControl
