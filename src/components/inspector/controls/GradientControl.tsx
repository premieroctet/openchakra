import React, { ReactNode, useState, memo, useEffect } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Grid,
  PopoverBody,
  IconButton,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  useTheme,
  Slider,
  Portal,
  Select,
  Button,
} from '@chakra-ui/react'
import FormControl from './FormControl'
import { useForm } from '~hooks/useForm'
import omit from 'lodash/omit'
import ColorPicker from 'coloreact'
import usePropsSelector from '~hooks/usePropsSelector'

export type Gradient =
  | 'to-t'
  | 'to-tr'
  | 'to-r'
  | 'to-br'
  | 'to-b'
  | 'to-bl'
  | 'to-l'
  | 'to-tl'
type GradientControlPropsType = {
  name: string
  label: string | ReactNode
  enableHues?: boolean
  withFullColor?: boolean
  options?: Gradient[]
}

const GradientControl = (props: GradientControlPropsType) => {
  const { setValue, setValueFromEvent } = useForm()
  const [hue, setHue] = useState(500)
  const [gradientColor, setGradientColor] = useState(['green.200', 'blue.500'])
  const [directionValue, setDirectionValue] = useState('to-r')

  const value = usePropsSelector(props.name)

  const theme = useTheme()
  const choices = props.options

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

  useEffect(() => {
    setValue(
      props.name,
      `linear(${directionValue}, ${gradientColor.toString()})`,
    )
  }, [directionValue, gradientColor, props.name, setValue])

  const updateGradient = (value: string, index: number) => {
    let colorCopy = [...gradientColor]
    colorCopy[index] = value
    setGradientColor(colorCopy)
  }

  const huesPicker = (i: number) => (
    <>
      <Grid mb={2} templateColumns="repeat(5, 1fr)" gap={0}>
        {Object.keys(themeColors).map(colorName => (
          <Box
            border={colorName.includes('white') ? '1px solid lightgrey' : ''}
            key={colorName}
            _hover={{ boxShadow: 'lg' }}
            cursor="pointer"
            bg={`${colorName}.${props.enableHues ? hue : 500}`}
            onClick={() => {
              updateGradient(`${colorName}.${hue}`, i)
            }}
            mt={2}
            borderRadius="full"
            height="30px"
            width="30px"
          />
        ))}
      </Grid>

      {props.enableHues && (
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

  return (
    <>
      <FormControl label={props.label}>
        <Select
          size="sm"
          id={directionValue || 'direction'}
          name={directionValue || 'direction'}
          value={directionValue || ''}
          onChange={value => setDirectionValue(value.target.value)}
        >
          {choices?.map((choice: string) => (
            <option key={choice}>{choice}</option>
          ))}
        </Select>
      </FormControl>
      {gradientColor.map((e, i) => (
        <FormControl label="">
          <Popover placement="bottom">
            <PopoverTrigger>
              <IconButton
                mr={2}
                boxShadow="md"
                border={e ? 'none' : '2px solid grey'}
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
                        <TabPanel p={0}>{huesPicker(i)}</TabPanel>

                        <TabPanel p={0}>
                          <Box position="relative" height="150px">
                            <ColorPicker
                              color={e}
                              onChange={(color: any) => {
                                updateGradient(`#${color.hex}`, i)
                              }}
                            />
                            );
                          </Box>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  ) : (
                    huesPicker(i)
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
          onClick={() => setGradientColor([...gradientColor, 'white.500'])}
        >
          + Add
        </Button>
      </Box>
    </>
  )
}

export default memo(GradientControl)
