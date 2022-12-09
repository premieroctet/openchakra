import { AddIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import { Select as MultiSelect } from 'chakra-react-select'
import ColorPicker from 'coloreact'
import {
  Button,
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
  theme as baseTheme,
  Select,
  Box,
  Text,
  Stack,
  Checkbox,
  Divider,
  HStack,
  Tooltip,
  IconButton,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Tab,
  extendTheme,
  LightMode,
  VStack,
  Input,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Grid,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'
import { omit } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getNewTheme,
  getTheme,
  getThemePath,
} from '~core/selectors/customComponents'
import useDispatch from '~hooks/useDispatch'
import API from '~custom-components/api'
import { themeColors } from './editor/Editor'
import { NewThemeType } from '~core/models/customComponents'

const componentsWithLabel = Object.keys(baseTheme.components).map(
  (comp: string) => ({
    label: comp,
    value: comp,
  }),
)

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
        <PopoverContent width={200}>
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
        <Text>Text Color</Text>
        <ParentColorPicker
          withFullColor={true}
          selectedColor={themeState.textColor}
          propType="textColor"
        />
      </HStack>
    </VStack>
  )
}

const ThemeLayers = ({ themeState }: any) => {
  const dispatch = useDispatch()

  return (
    <>
      <Accordion allowToggle>
        {themeState.map((layer: any, i: number) => {
          return (
            <AccordionItem key={i}>
              <AccordionButton _expanded={{ bg: 'teal.100' }}>
                <Box flex="1" textAlign="left">
                  Layer {i}:{' '}
                  {layer.components ? layer.components.join(', ') : 'All'}
                </Box>
                <AccordionIcon />
                {i ? (
                  <Button
                    bgColor="red.500"
                    _hover={{ bgColor: 'red.300' }}
                    onClick={() => {
                      dispatch.customComponents.removeLayer(i)
                    }}
                    color="white"
                    size="sm"
                    p={0}
                    mx={4}
                  >
                    <DeleteIcon mx={1} />
                  </Button>
                ) : (
                  <Text mx={1}>(Default)</Text>
                )}
              </AccordionButton>
              <AccordionPanel p={4} overflowY="visible">
                <Stack>
                  <HStack>
                    <Checkbox
                      isDisabled={!i}
                      colorScheme="teal"
                      value="colorScheme"
                      isChecked={!!layer.defaultProps.colorScheme}
                      onChange={() => {
                        themeState[i].defaultProps.colorScheme
                          ? dispatch.customComponents.deleteProp(
                              i,
                              'colorScheme',
                            )
                          : dispatch.customComponents.updateProp({
                              extIndex: i,
                              propType: 'colorScheme',
                              propValue: 'blue',
                            })
                      }}
                    >
                      ColorScheme
                    </Checkbox>
                    {themeColors.map((themeColor: string) => (
                      <Tooltip key={themeColor} label={themeColor}>
                        <IconButton
                          colorScheme={themeColor}
                          mr={2}
                          boxShadow="md"
                          border={
                            layer.defaultProps.colorScheme === themeColor
                              ? '2px solid black'
                              : 'none'
                          }
                          isRound
                          aria-label="Color"
                          size="sm"
                          icon={
                            layer.defaultProps.colorScheme === themeColor ? (
                              <CheckIcon color="black" />
                            ) : (
                              <></>
                            )
                          }
                          onClick={() => {
                            dispatch.customComponents.updateProp({
                              extIndex: i,
                              propType: 'colorScheme',
                              propValue: themeColor,
                            })
                          }}
                        />
                      </Tooltip>
                    ))}
                  </HStack>
                  <Divider />
                  <HStack>
                    <Checkbox
                      isDisabled={!i}
                      colorScheme="teal"
                      value="size"
                      isChecked={!!layer.defaultProps.size}
                      onChange={() => {
                        themeState[i].defaultProps.size
                          ? dispatch.customComponents.deleteProp(i, 'size')
                          : dispatch.customComponents.updateProp({
                              extIndex: i,
                              propType: 'size',
                              propValue: 'md',
                            })
                      }}
                    >
                      Size
                    </Checkbox>
                    <Select
                      id="size"
                      onChange={e => {
                        dispatch.customComponents.updateProp({
                          extIndex: i,
                          propType: 'size',
                          propValue: e.target.value,
                        })
                      }}
                      name="size"
                      size="sm"
                      value={layer.defaultProps.size}
                    >
                      <option value="xs">xs</option>
                      <option value="sm">sm</option>
                      <option value="md">md</option>
                      <option value="lg">lg</option>
                      <option value="xl">xl</option>
                    </Select>
                  </HStack>
                  <Divider />
                  <HStack>
                    <Checkbox
                      isDisabled={!i}
                      colorScheme="teal"
                      value="variant"
                      isChecked={!!layer.defaultProps.variant}
                      onChange={() => {
                        themeState[i].defaultProps.variant
                          ? dispatch.customComponents.deleteProp(i, 'variant')
                          : dispatch.customComponents.updateProp({
                              extIndex: i,
                              propType: 'variant',
                              propValue: 'solid',
                            })
                      }}
                    >
                      Variant
                    </Checkbox>
                    <Select
                      id="variant"
                      onChange={e => {
                        dispatch.customComponents.updateProp({
                          extIndex: i,
                          propType: 'variant',
                          propValue: e.target.value,
                        })
                      }}
                      name="variant"
                      size="sm"
                      value={layer.defaultProps.variant}
                    >
                      <option value="outline">outline</option>
                      <option value="ghost">ghost</option>
                      <option value="unstyled">unstyled</option>
                      <option value="link">link</option>
                      <option value="solid">solid</option>
                    </Select>
                  </HStack>
                  <Divider />
                </Stack>
                <Text>Applies to: </Text>
                <MultiSelect
                  className="multiselect"
                  maxMenuHeight={160}
                  menuPlacement="top"
                  isMulti
                  name={'layer' + i}
                  options={componentsWithLabel}
                  placeholder="All (if none selected)"
                  closeMenuOnSelect={false}
                  size="sm"
                  colorScheme="teal"
                  focusBorderColor="teal.500"
                  tagVariant="outline"
                  isDisabled={!i}
                  selectedOptionStyle="check"
                  value={layer.components?.map((comp: string) => ({
                    label: comp,
                    value: comp,
                  }))}
                  hideSelectedOptions={false}
                  onChange={comps => {
                    dispatch.customComponents.updateLayerComponents(
                      i,
                      comps.map(c => c.value),
                    )
                  }}
                />
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
      <Button
        bgColor="teal.500"
        _hover={{ bgColor: 'teal.300' }}
        onClick={() => dispatch.customComponents.addLayer()}
        color="white"
        m={2}
      >
        <AddIcon mx={1} />
        <Text letterSpacing="wide" fontSize="sm" textTransform="capitalize">
          Add Layer
        </Text>
      </Button>
    </>
  )
}

const ThemeCustomStyles = () => {
  return <>ThemeCustomStyles</>
}

const Themer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const themeState = useSelector(getTheme)
  const newThemeState = useSelector(getNewTheme)
  const themePath = useSelector(getThemePath)
  const dispatch = useDispatch()

  useEffect(() => {
    // TODO: baseStyle, parts, fonts, layer & text styles
    const updateThemeJson = async () => {
      if (themePath)
        await API.post('/save-theme', {
          themePath,
          themeState,
        })
    }
    dispatch.app.toggleLoader()
    updateThemeJson()
    dispatch.app.toggleLoader()
  }, [themeState, newThemeState])

  return (
    <LightMode>
      <Button
        px={6}
        bgGradient="linear(to-br, blue.300, green.300, yellow.300, red.300)"
        display="flex"
        flexDirection="row"
        alignItems="center"
        fontSize="sm"
        whiteSpace="nowrap"
        _hover={{
          bgGradient: 'linear(to-br, blue.200, green.200, yellow.200, red.200)',
        }}
        onClick={onOpen}
        color="black"
      >
        Theme
      </Button>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="xl">
        <DrawerOverlay />
        <style>
          {
            '\
              .themer select, .themer input, .themer hr, .themer span, .themer .chakra-tabs__tablist, .themer .chakra-modal__body, .themer .chakra-modal__header, .themer chakra-tabs__tab-panels, .themer .chakra-accordion__item, .multiselect{\
              border-color:var(--chakra-colors-gray-200) !important;\
              }\
              '
          }
        </style>
        <DrawerContent
          className="themer"
          bgColor="white"
          style={{ color: 'black', colorScheme: 'teal' }}
        >
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Customize Project Theme
          </DrawerHeader>
          <DrawerBody>
            <Tabs
              variant="line"
              isLazy
              colorScheme="teal"
              orientation="vertical"
              className="theme"
            >
              <TabList>
                <Tab>
                  <Tooltip
                    label="Set default CSS properties"
                    fontSize="sm"
                    hasArrow
                    placement="right"
                  >
                    Tokens
                  </Tooltip>
                </Tab>
                <Divider />
                <Tab>
                  <Tooltip
                    label="Add theme layers where the lower layer overrides the theme configuration set in above layers"
                    fontSize="sm"
                    hasArrow
                    placement="right"
                  >
                    Layers
                  </Tooltip>
                </Tab>
                <Divider />
                <Tab>
                  <Tooltip
                    label="Create your own custom styles"
                    fontSize="sm"
                    hasArrow
                    placement="right"
                  >
                    Custom Styles
                  </Tooltip>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ThemeTokens themeState={newThemeState} />
                </TabPanel>
                <TabPanel>
                  <ThemeLayers themeState={themeState} />
                </TabPanel>
                <TabPanel>
                  <ThemeCustomStyles />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </LightMode>
  )
}

export default Themer
