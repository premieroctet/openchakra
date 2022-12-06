import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  InfoOutlineIcon,
} from '@chakra-ui/icons'
import { Select as MultiSelect } from 'chakra-react-select'
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
  extendTheme,
  theme as baseTheme,
  Select,
  withDefaultProps,
  Box,
  Text,
  Stack,
  Checkbox,
  Divider,
  HStack,
  Tooltip,
  IconButton,
} from '@chakra-ui/react'
import { omit } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getTheme, getThemePath } from '~core/selectors/customComponents'
import useDispatch from '~hooks/useDispatch'
import API from '~custom-components/api'

const themeColors: any = Object.keys(
  omit(baseTheme.colors, ['transparent', 'current', 'black', 'white']),
)

const componentsWithLabel = Object.keys(baseTheme.components).map(
  (comp: string) => ({
    label: comp,
    value: comp,
  }),
)

const ThemeLayers = () => {
  const themeState = useSelector(getTheme)
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
  }, [themeState])

  return (
    <>
      <Accordion allowToggle>
        {themeState.map((layer, i) => {
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
                  maxMenuHeight={160}
                  menuPlacement="top"
                  isMulti
                  name={'layer' + i}
                  options={componentsWithLabel}
                  placeholder="All (if none selected)"
                  closeMenuOnSelect={false}
                  size="sm"
                  colorScheme="teal"
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
                {/* <Select
                    variant="flushed"
                    px={2}
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                    isDisabled={!i}
                    placeholder="All"
                  >
                    {Object.keys(baseTheme.components).map((comp: any) => {
                      return (
                        <option key={comp} value={comp}>
                          {comp}
                        </option>
                      )
                    })}
                  </Select> */}
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

const Themer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <ChakraProvider resetCSS>
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
        <DrawerContent bgColor="white">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Customize Project Theme
            <Tooltip
              label="Add theme layers where the lower layer overrides the theme configuration set in above layers"
              fontSize="md"
              hasArrow
              placement="left"
            >
              <InfoOutlineIcon color="teal.300" w={4} h={4} ml={2} />
            </Tooltip>
          </DrawerHeader>
          <DrawerBody>
            <ThemeLayers />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  )
}

export default Themer
