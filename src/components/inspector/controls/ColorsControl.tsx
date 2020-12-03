import React, { ReactNode, useState, memo } from 'react'
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
} from '@chakra-ui/react'
import FormControl from './FormControl'
import { useForm } from '~hooks/useForm'
import omit from 'lodash/omit'
import ColorPicker from 'coloreact'
import usePropsSelector from '~hooks/usePropsSelector'

type ColorControlPropsType = {
  name: string
  label: string | ReactNode
  enableHues?: boolean
  withFullColor?: boolean
}

const ColorsControl = (props: ColorControlPropsType) => {
  const { setValue, setValueFromEvent } = useForm()
  const [hue, setHue] = useState(500)
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

  const huesPicker = (
    <>
      <Grid mb={2} templateColumns="repeat(5, 1fr)" gap={0}>
        {Object.keys(themeColors).map(colorName => (
          <Box
            border={colorName.includes('white') ? '1px solid lightgrey' : ''}
            key={colorName}
            _hover={{ boxShadow: 'lg' }}
            cursor="pointer"
            bg={`${colorName}.${props.enableHues ? hue : 500}`}
            onClick={() =>
              setValue(
                props.name,
                props.enableHues ? `${colorName}.${hue}` : colorName,
              )
            }
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
                    <TabPanel p={0}>{huesPicker}</TabPanel>

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
                huesPicker
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
