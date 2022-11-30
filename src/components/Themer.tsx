import {
  AddIcon,
  CheckIcon,
  DeleteIcon,
  InfoOutlineIcon,
} from '@chakra-ui/icons'
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
  CheckboxGroup,
  Stack,
  Checkbox,
  Divider,
  HStack,
  Tooltip,
  useCheckboxGroup,
  IconButton,
} from '@chakra-ui/react'
import { omit } from 'lodash'
import React, { useState } from 'react'

const themeColors: any = Object.keys(
  omit(baseTheme.colors, ['transparent', 'current', 'black', 'white']),
)
const themeComponents: any = Object.keys(baseTheme.components)

const initialThemeState = [
  {
    defaultProps: {
      colorScheme: 'blue',
      size: 'md',
      variant: 'solid',
    },
    components: themeComponents,
  },
]

const ThemeLayers = () => {
  const [selectedOption, setSelectedOption] = useState('All')
  const [themeState, setThemeState] = useState(initialThemeState)
  // baseStyle, defaultProps, sizes, variants, parts

  return (
    <ChakraProvider resetCSS>
      <Accordion allowToggle>
        {themeState.map((layer, i) => {
          return (
            <AccordionItem key={i}>
              <AccordionButton _expanded={{ bg: 'teal.100' }}>
                <Box flex="1" textAlign="left">
                  Layer {i}: {layer.components ? layer.components : 'All'}
                </Box>
                <AccordionIcon />
                {i ? (
                  <Button
                    bgColor="red.500"
                    _hover={{ bgColor: 'red.300' }}
                    onClick={() => {
                      themeState.splice(i, 1)
                      setThemeState([...themeState])
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
              <AccordionPanel p={4}>
                <CheckboxGroup
                  colorScheme="teal"
                  defaultValue={['colorScheme', 'size', 'variant']}
                >
                  <Stack>
                    <HStack>
                      <Checkbox value="colorScheme">ColorScheme</Checkbox>
                      {themeColors.map((themeColor: string, i: number) => (
                        <Tooltip key={themeColor} label={themeColor}>
                          <IconButton
                            colorScheme={themeColor}
                            mr={2}
                            boxShadow="md"
                            border={
                              layer.defaultProps.colorScheme == themeColor
                                ? '2px solid black'
                                : 'none'
                            }
                            isRound
                            aria-label="Color"
                            size="sm"
                            icon={
                              layer.defaultProps.colorScheme == themeColor ? (
                                <CheckIcon color="black" />
                              ) : (
                                <></>
                              )
                            }
                            onClick={() => {
                              layer.defaultProps.colorScheme = themeColor
                              setThemeState([...themeState])
                            }}
                          />
                        </Tooltip>
                      ))}
                    </HStack>
                    <Divider />
                    <HStack>
                      <Checkbox value="size">Size</Checkbox>
                      <Select
                        id="size"
                        onChange={e => {
                          themeState[i].defaultProps.size = e.target.value
                          setThemeState([...themeState])
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
                      <Checkbox value="variant">Variant</Checkbox>
                      <Select
                        id="variant"
                        onChange={e => {
                          themeState[i].defaultProps.variant = e.target.value
                          setThemeState([...themeState])
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
                </CheckboxGroup>
                <HStack m={1}>
                  <Text>Applies to: </Text>
                  <Select
                    variant="flushed"
                    px={2}
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                  >
                    <option value="All">All</option>
                    {Object.keys(baseTheme.components).map((comp: any) => {
                      return (
                        <option key={comp} value={comp}>
                          {comp}
                        </option>
                      )
                    })}
                  </Select>
                </HStack>
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
      <Button
        bgColor="teal.500"
        _hover={{ bgColor: 'teal.300' }}
        onClick={() => {
          setThemeState([...themeState, themeState.slice(-1)[0]])
        }}
        color="white"
        m={2}
      >
        <AddIcon mx={1} />
        <Text letterSpacing="wide" fontSize="sm" textTransform="capitalize">
          Add Layer
        </Text>
      </Button>
    </ChakraProvider>
  )
}

const Themer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <ChakraProvider
      resetCSS
      theme={extendTheme(
        // {
        //   components: {
        //     Button: {
        //       defaultProps: {
        //         colorScheme: 'blue',
        //       },
        //     },
        //   },
        // },
        withDefaultProps({
          defaultProps: {
            colorScheme: 'blue',
            size: 'md',
            variant: 'solid',
          },
        }),
      )}
    >
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
