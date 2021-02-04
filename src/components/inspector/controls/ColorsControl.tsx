import React, { ReactNode, memo } from 'react'
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
  useTheme,
  Portal,
} from '@chakra-ui/react'
import FormControl from './FormControl'
import { useForm } from '~hooks/useForm'
import omit from 'lodash/omit'
import ColorPicker from 'coloreact'
import usePropsSelector from '~hooks/usePropsSelector'
import HuesPicker from './HuesPickerControl'

type ColorControlPropsType = {
  name: string
  label: string | ReactNode
  enableHues?: boolean
  withFullColor?: boolean
}

const ColorsControl = (props: ColorControlPropsType) => {
  const { setValue, setValueFromEvent } = useForm()
  const value = usePropsSelector(props.name)
  const theme = useTheme()

  const themeColors: any = omit(theme.colors, [
    'transparent',
    'current',
    'black',
    'white',
  ])

  let propsIconButton: any = { bg: value }
  if (value && themeColors[value]) {
    propsIconButton = { colorScheme: value }
  }

  return (
    <FormControl label={props.label}>
      <Popover placement="bottom">
        <PopoverTrigger>
          <IconButton
            mr={2}
            boxShadow="md"
            border={value ? 'none' : '2px solid grey'}
            isRound
            aria-label="Color"
            size="xs"
            {...propsIconButton}
          />
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
                      <HuesPicker
                        name={props.name}
                        themeColors={themeColors}
                        enableHues
                        setValue={setValue}
                        gradient={false}
                      />
                    </TabPanel>

                    <TabPanel p={0}>
                      <Box position="relative" height="150px">
                        <ColorPicker
                          color={value}
                          onChange={(color: any) => {
                            setValue(props.name, `#${color.hex}`)
                          }}
                        />
                        );
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              ) : (
                <HuesPicker
                  name={props.name}
                  themeColors={themeColors}
                  enableHues
                  setValue={setValue}
                  gradient={false}
                />
              )}
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <Input
        width="100px"
        size="sm"
        name={props.name}
        onChange={setValueFromEvent}
        value={value}
      />
    </FormControl>
  )
}

export default memo(ColorsControl)
