import React, { memo, useState, useEffect } from 'react'
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
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/core'
import { DiGithubBadge } from 'react-icons/di'
import { AiFillThunderbolt, AiOutlineLogin } from 'react-icons/ai'
import { buildParameters } from '~utils/codesandbox'
import { generateCode } from '~utils/code'
import useDispatch from '~hooks/useDispatch'
import { useSelector } from 'react-redux'
import { getComponents } from '~core/selectors/components'
import { getShowLayout, getShowCode } from '~core/selectors/app'
import HeaderMenu from '~components/headerMenu/HeaderMenu'
import { Session, signIn, signOut } from 'next-auth/client'

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

interface Props {
  saveProject?: () => void
  session?: Session | null | undefined
  onOpen?: () => void
  showUserProjectList?: () => void
  projectPage?: boolean
}

const Header = (props: Props) => {
  const showLayout = useSelector(getShowLayout)
  const showCode = useSelector(getShowCode)
  const dispatch = useDispatch()

  const initProject = async () => {
    if (props.projectPage) {
      await dispatch.app.toggleBuilderMode()
    }
  }

  useEffect(() => {
    initProject()
    // eslint-disable-next-line
  }, [])

  return (
    <DarkMode>
      <Flex
        justifyContent="space-between"
        bg="#1a202c"
        as="header"
        height="3rem"
        px="1rem"
      >
        <Link href="/">
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
            <Box
              fontSize="2xl"
              as={AiFillThunderbolt}
              mr={1}
              color="teal.100"
            />
            <Box fontWeight="bold">open</Box>chakra
          </Flex>
        </Link>

        {props.projectPage ? (
          <></>
        ) : (
          <Flex flexGrow={1} justifyContent="space-between" alignItems="center">
            <Stack isInline spacing={4} justify="center" align="center">
              <Box>
                <HeaderMenu
                  saveProject={props.saveProject}
                  session={props.session}
                  onOpen={props.onOpen}
                  showUserProjectList={props.showUserProjectList}
                />
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
          </Flex>
        )}

        <Stack
          justifyContent="flex-end"
          width="13rem"
          align="center"
          isInline
          spacing="2"
        >
          {props.session ? (
            <Box zIndex={100000}>
              <Menu>
                <LightMode>
                  <MenuButton>
                    <Avatar
                      size="xs"
                      name={props.session.user.name as string}
                      src={props.session.user.image as string}
                    />
                  </MenuButton>
                  <MenuList backgroundColor="white">
                    <MenuItem onClick={() => signOut()}>
                      <Box mr={2} as={AiOutlineLogin} />
                      Logout
                    </MenuItem>
                  </MenuList>
                </LightMode>
              </Menu>
            </Box>
          ) : (
            <Button
              onClick={() =>
                signIn(undefined, {
                  callbackUrl: 'test',
                })
              }
              variantColor="teal"
              variant="outline"
              size="xs"
            >
              Login
            </Button>
          )}
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
