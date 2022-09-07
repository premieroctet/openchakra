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
  HStack,
  Select,
} from '@chakra-ui/react'
import { ExternalLinkIcon, SmallCloseIcon, CheckIcon } from '@chakra-ui/icons'
import { DiGithubBadge } from 'react-icons/di'
import { AiFillThunderbolt } from 'react-icons/ai'
import { buildParameters } from '~utils/codesandbox'
import { generateCode } from '~utils/code'
import { deploy } from '~utils/deploy'
import useDispatch from '~hooks/useDispatch'
import { useSelector } from 'react-redux'
import { getComponents } from '~core/selectors/components'
import { getDevice, getShowLayout, getShowCode } from '~core/selectors/app'
import HeaderMenu from '~components/headerMenu/HeaderMenu'
import devices from '~config/devices'

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
        rightIcon={<ExternalLinkIcon path="" />}
        variant="ghost"
        size="xs"
      >
        Export code
      </Button>
    </Tooltip>
  )
}

const DeployButton = () => {
  const components = useSelector(getComponents)
  const [isDeploying, setIsDeploying] = useState(false)

  return (
    <Tooltip
      zIndex={100}
      hasArrow
      bg="yellow.100"
      aria-label="Builder mode help"
      label="Deploy in production"
    >
      <Button
        onClick={() => {
          setIsDeploying(true)
          deploy(components)
            .then(() => {
              alert('Deployment ok')
            })
            .catch(err => {
              alert('Deployment error:' + err)
            })
            .finally(() => {
              setIsDeploying(false)
            })
        }}
        isLoading={isDeploying}
        variant="ghost"
        size="xs"
      >
        Deploy to production
      </Button>
    </Tooltip>
  )
}

const Header = () => {
  const showLayout = useSelector(getShowLayout)
  const device = useSelector(getDevice)
  const showCode = useSelector(getShowCode)
  const dispatch = useDispatch()

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
          <HStack spacing={4} justify="center" align="center">
            <Box>
              <HeaderMenu />
            </Box>
            <FormControl flexDirection="row" display="flex" alignItems="center">
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
                  mb={0}
                  mr={2}
                  whiteSpace="nowrap"
                >
                  Builder mode
                </FormLabel>
              </Tooltip>
              <LightMode>
                <Switch
                  isChecked={showLayout}
                  colorScheme="teal"
                  size="sm"
                  onChange={() => dispatch.app.toggleBuilderMode()}
                  id="preview"
                />
              </LightMode>
            </FormControl>

            <FormControl display="flex" flexDirection="row" alignItems="center">
              <FormLabel
                color="gray.200"
                fontSize="xs"
                mr={2}
                mb={0}
                htmlFor="code"
                pb={0}
                whiteSpace="nowrap"
              >
                Code panel
              </FormLabel>
              <LightMode>
                <Switch
                  isChecked={showCode}
                  id="code"
                  colorScheme="teal"
                  onChange={() => dispatch.app.toggleCodePanel()}
                  size="sm"
                />
              </LightMode>
            </FormControl>

            <FormControl display="flex" flexDirection="row" alignItems="center">
              <FormLabel
                color="gray.200"
                fontSize="xs"
                mr={2}
                mb={0}
                htmlFor="device"
                pb={0}
                whiteSpace="nowrap"
              >
                Device
              </FormLabel>
              <LightMode>
                <Select
                  id="device"
                  onChange={e => dispatch.app.selectDevice(e.target.value)}
                  style={{ color: 'white', width: 'max-content' }}
                >
                  {Object.keys(devices).map(devicekey => (
                    <option
                      key={devicekey}
                      value={devicekey}
                      selected={devicekey === device}
                    >
                      {devicekey}
                    </option>
                  ))}
                </Select>
              </LightMode>
            </FormControl>
          </HStack>

          <Stack direction="row">
            <CodeSandboxButton />
            <DeployButton />
            <Popover>
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <Button
                      ml={4}
                      rightIcon={<SmallCloseIcon path="" />}
                      size="xs"
                      variant="ghost"
                    >
                      Clear
                    </Button>
                  </PopoverTrigger>
                  <LightMode>
                    <PopoverContent zIndex={100} bg="white">
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
                          colorScheme="red"
                          rightIcon={<CheckIcon path="" />}
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
        </Flex>

        <Stack
          justifyContent="flex-end"
          width="13rem"
          align="center"
          direction="row"
          spacing="2"
        >
          <Link isExternal href="https://github.com/premieroctet/openchakra">
            <Box as={DiGithubBadge} size={32} color="gray.200" />
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
