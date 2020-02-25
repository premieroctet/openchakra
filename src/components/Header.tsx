import React, { memo, useState } from 'react'
import {
  Box,
  Switch,
  Button,
  Flex,
  Link,
  Stack,
  FormLabel,
  DarkMode,
  FormControl,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  LightMode,
  PopoverFooter,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  ModalHeader,
} from '@chakra-ui/core'
import { DiGithubBadge } from 'react-icons/di'
import { AiFillThunderbolt } from 'react-icons/ai'
import { buildParameters } from '../utils/codesandbox'
import { generateCode } from '../utils/code'
import useDispatch from '../hooks/useDispatch'
import { useSelector } from 'react-redux'
import { getComponents } from '../core/selectors/components'
import { getShowLayout, getShowCode, getThemeData } from '../core/selectors/app'
import { FaRegSave, FaBomb, FaEdit } from 'react-icons/fa'
import { GoRepo } from 'react-icons/go'
import { FiUpload } from 'react-icons/fi'

const CodeSandboxButton = () => {
  const components = useSelector(getComponents)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Tooltip
      zIndex={100}
      hasArrow
      bg="yellow.100"
      aria-label="Builder mode help"
      label="Export in CodeSandbox"
    >
      <Button
        onClick={async () => {
          setIsLoading(true)
          const code = await generateCode(components)
          setIsLoading(false)
          const parameters = buildParameters(code)

          window.open(
            `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`,
            '_blank',
          )
        }}
        isLoading={isLoading}
        rightIcon="external-link"
        variant="ghost"
        size="xs"
      >
        Export code
      </Button>
    </Tooltip>
  )
}

const Header = () => {
  const showLayout = useSelector(getShowLayout)
  useSelector(getThemeData)
  const showCode = useSelector(getShowCode)
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fileLoaded, setFileLoaded] = useState(false)
  const [fileError, setFileError] = useState(false)

  const handleChange = async (selectorFiles: any) => {
    selectorFiles.preventDefault()
    const reader = new FileReader()
    reader.onload = async e => {
      if (e.target!.result) {
        const text = e.target!.result
        // @ts-ignore
        dispatch.app.getThemeData(JSON.parse(text))
        setFileLoaded(true)
      } else {
        setFileError(true)
      }
    }
    reader.readAsText(selectorFiles.target.files[0])
  }

  return (
    <DarkMode>
      <Flex
        justifyContent="space-between"
        bg="#1a202c"
        as="header"
        height="3rem"
        px="1rem"
      >
        <Flex
          width="14rem"
          height="100%"
          backgroundColor="#1a202c"
          color="white"
          as="a"
          fontSize="xl"
          flexDirection="row"
          alignItems="center"
          aria-label="Chakra UI, Back to homepage"
        >
          <Box fontSize="2xl" as={AiFillThunderbolt} mr={1} color="teal.100" />{' '}
          <Box fontWeight="bold">open</Box>chakra
        </Flex>

        <Flex flexGrow={1} justifyContent="space-between" alignItems="center">
          <Stack isInline spacing={4} justify="center" align="center">
            <Box>
              <Menu>
                <MenuButton>
                  <Button
                    rightIcon="chevron-down"
                    size="xs"
                    variant="ghost"
                    variantColor="gray"
                  >
                    Editor
                  </Button>
                </MenuButton>
                <LightMode>
                  <MenuList zIndex={100}>
                    <MenuItem>
                      <Box mr={2} as={FaRegSave} />
                      Save components
                    </MenuItem>
                    <MenuItem>
                      <Box mr={2} as={FiUpload} />
                      Import components
                    </MenuItem>
                    <MenuItem onClick={onOpen}>
                      <Box mr={2} as={FaEdit} />
                      Edit theme
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>
                      <Box mr={2} as={GoRepo} />
                      Chakra UI Docs
                    </MenuItem>
                    <MenuItem>
                      <Box mr={2} as={FaBomb} />
                      Report issue
                    </MenuItem>
                  </MenuList>
                </LightMode>
              </Menu>
            </Box>
            <FormControl>
              <Tooltip
                zIndex={100}
                hasArrow
                bg="yellow.100"
                aria-label="Builder mode help"
                label="Builder mode adds extra padding/borders"
              >
                <FormLabel
                  cursor="help"
                  color="gray.200"
                  fontSize="xs"
                  htmlFor="preview"
                  pb={0}
                >
                  Builder mode
                </FormLabel>
              </Tooltip>
              <Switch
                isChecked={showLayout}
                color="teal"
                size="sm"
                onChange={() => dispatch.app.toggleBuilderMode()}
                id="preview"
              />
            </FormControl>

            <FormControl>
              <FormLabel color="gray.200" fontSize="xs" htmlFor="code" pb={0}>
                Code panel
              </FormLabel>
              <Switch
                isChecked={showCode}
                id="code"
                color="teal"
                onChange={() => dispatch.app.toggleCodePanel()}
                size="sm"
              />
            </FormControl>
          </Stack>

          <Stack isInline>
            <CodeSandboxButton />

            <Popover>
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <Button
                      ml={4}
                      rightIcon="small-close"
                      size="xs"
                      variant="ghost"
                    >
                      Clear
                    </Button>
                  </PopoverTrigger>
                  <LightMode>
                    <PopoverContent zIndex={100}>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Are you sure?</PopoverHeader>
                      <PopoverBody fontSize="sm">
                        Do you really want to remove all components on the
                        editor?
                      </PopoverBody>
                      <PopoverFooter display="flex" justifyContent="flex-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          variantColor="red"
                          rightIcon="check"
                          onClick={() => {
                            dispatch.components.reset()
                            if (onClose) {
                              onClose()
                            }
                          }}
                        >
                          Yes, clear
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </LightMode>
                </>
              )}
            </Popover>
          </Stack>
          <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent color="white">
              <ModalHeader fontSize="15px" textAlign="center">
                Select your custom JSON Theme Object
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  id="themeFile"
                  type="file"
                  accept="application/json"
                  onChange={(selectorFiles: any) => handleChange(selectorFiles)}
                />

                {fileLoaded && (
                  <div>
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>
                      Your theme has been successfully loaded{' '}
                      <span
                        style={{ verticalAlign: 'middle' }}
                        role="img"
                        aria-label="light"
                      >
                        ✅
                      </span>
                    </p>
                  </div>
                )}

                {fileError && (
                  <p>
                    Can't read this file / theme{' '}
                    <span
                      style={{ verticalAlign: 'middle' }}
                      role="img"
                      aria-label="light"
                    >
                      ❌
                    </span>
                  </p>
                )}
              </ModalBody>

              <ModalFooter>
                <Button variantColor="blue" mr={3} onClick={onClose} size="sm">
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>

        <Stack
          justifyContent="flex-end"
          width="13rem"
          align="center"
          isInline
          spacing="2"
        >
          <Link isExternal href="https://github.com/premieroctet/openchakra">
            <Box as={DiGithubBadge} size="8" color="gray.200" />
          </Link>
          <Box lineHeight="shorter" color="white" fontSize="xs">
            by{' '}
            <Link isExternal href="https://premieroctet.com" color="teal.100">
              Premier Octet
            </Link>
          </Box>
        </Stack>
      </Flex>
    </DarkMode>
  )
}

export default memo(Header)
