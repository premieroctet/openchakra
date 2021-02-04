import React, { ReactNode, useState, memo, useEffect } from 'react'
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
  Select,
  Button,
  Switch,
} from '@chakra-ui/react'
import FormControl from './FormControl'
import { useForm } from '~hooks/useForm'
import omit from 'lodash/omit'
import ColorPicker from 'coloreact'
import HuesPicker from './HuesPickerControl'

export type Gradient =
  | 'to top'
  | 'to top right'
  | 'to right'
  | 'to bottom right'
  | 'to bottom'
  | 'to bottom left'
  | 'to left'
  | 'to top left'
type GradientControlPropsType = {
  name: string
  label: string | ReactNode
  enableHues?: boolean
  withFullColor?: boolean
  options?: Gradient[]
}

const GradientControl = (props: GradientControlPropsType) => {
  const { setValue, setValueFromEvent } = useForm()
  const [gradientColor, setGradientColor] = useState(['green.200', 'blue.500'])
  const [directionValue, setDirectionValue] = useState('to right')
  const [activate, setActivate] = useState(false)

  const theme = useTheme()
  const choices = props.options

  const themeColors: any = omit(theme.colors, [
    'transparent',
    'current',
    'black',
    'white',
  ])

  const updateValue = () => {
    if (activate) {
      setValue(
        props.name,
        `linear(${directionValue}, ${gradientColor.toString()})`,
      )
    }
  }

  useEffect(() => {
    updateValue()
    //eslint-disable-next-line
  }, [directionValue, gradientColor, activate])

  const updateGradient = async (value: string, index: number) => {
    let colorCopy = [...gradientColor]
    colorCopy[index] = value
    setGradientColor(colorCopy)
  }

  return (
    <>
      <FormControl label={props.label}>
        <Switch
          name="Activate Gradient"
          id="gradient"
          size="sm"
          isChecked={activate || false}
          onChange={() => setActivate(!activate)}
        />
      </FormControl>
      <FormControl label="">
        <Select
          size="sm"
          id={directionValue || 'direction'}
          name={directionValue || 'direction'}
          value={directionValue || ''}
          onChange={value => {
            setDirectionValue(value.target.value)
            if (activate) {
              setValue(
                props.name,
                `linear(${directionValue}, ${gradientColor.toString()})`,
              )
            }
          }}
        >
          {choices?.map((choice: string) => (
            <option key={choice}>{choice}</option>
          ))}
        </Select>
      </FormControl>
      {gradientColor.map((e, i) => (
        <FormControl label="" key={i}>
          <Popover placement="bottom">
            <PopoverTrigger>
              <IconButton
                mr={2}
                boxShadow="md"
                border={e ? 'none' : '2px solid grey'}
                isRound
                aria-label="Color"
                size="xs"
                colorScheme={e}
                bg={e}
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
                            gradient={true}
                            index={i}
                            updateGradient={updateGradient}
                          />
                        </TabPanel>

                        <TabPanel p={0}>
                          <Box position="relative" height="150px">
                            <ColorPicker
                              color={e}
                              onChange={(color: any) =>
                                updateGradient(`#${color.hex}`, i)
                              }
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
                      gradient={true}
                      index={i}
                      updateGradient={updateGradient}
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
            value={e}
          />
        </FormControl>
      ))}
      <Box textAlign="right">
        <Button
          colorScheme="teal"
          size="xs"
          onClick={() => setGradientColor([...gradientColor, 'whiteAlpha.500'])}
        >
          + Add
        </Button>
      </Box>
    </>
  )
}

export default memo(GradientControl)
