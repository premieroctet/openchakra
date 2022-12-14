import { AddIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
} from '@chakra-ui/react'
import React from 'react'
import useDispatch from '~hooks/useDispatch'
import { themeColors } from '../editor/Editor'

const componentsWithLabel = Object.keys(baseTheme.components).map(
  (comp: string) => ({
    label: comp,
    value: comp,
  }),
)

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
                {/* <MultiSelect
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
                /> */}
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

export default ThemeLayers
