import React, { useState } from 'react'
import {
  Flex,
  Box,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Alert,
  AlertIcon,
  Link,
  List,
  ListItem,
} from '@chakra-ui/core'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { Global } from '@emotion/core'
import { HotKeys } from 'react-hotkeys'
import Metadata from '~components/Metadata'
import useShortcuts, { keyMap } from '~hooks/useShortcuts'
import Header from '~components/Header'
import Sidebar from '~components/sidebar/Sidebar'
import EditorErrorBoundary from '~components/errorBoundaries/EditorErrorBoundary'
import Editor from '~components/editor/Editor'
import { InspectorProvider } from '~contexts/inspector-context'
import Inspector from '~components/inspector/Inspector'
import { checkUser, createProject } from '~utils/checkProject'
import { useSelector } from 'react-redux'
import { signIn, useSession } from 'next-auth/client'
import { getComponents } from '~core/selectors/components'
import { useRouter } from 'next/router'

interface Project {
  createdAt: string
  updatedAt: string
  userId: number
  id: number
  markup: string
  projectName: string
}

const App = (props: {
  id: number
  projectExist: boolean
  loading: boolean
}) => {
  const { handlers } = useShortcuts()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [projectName, setProjectName] = useState('')
  const [newProject, setNewProject] = useState(false)
  const [userProjectList, setUserProjectList] = useState([])
  const components = useSelector(getComponents)
  const [session] = useSession()
  const router = useRouter()
  const toast = useToast()

  const updateProject = async () => {
    const markup = JSON.stringify(components)
    let bodyData = {
      project: {
        markup: markup,
        id: props.id,
      },
    }
    const response = await fetch('/api/project/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    })
    const data = await response.json()
    return data
  }

  const initProject = async () => {
    if (projectName.length > 0) {
      const markup = JSON.stringify(components)
      let newProject = await createProject(markup, projectName)
      if (newProject) {
        toast({
          title: 'Created project',
          description: 'The project has been created successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        const href = `/project/${newProject.id}-${newProject.projectName}`
        router.push(href, href, { shallow: true })
      } else {
        toast({
          title: 'Error when created project',
          description: 'An error occured, try again later',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    } else {
      toast({
        title: 'Please enter a valid project name',
        description: 'Project name cannot be empty',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const showUserProjectList = async () => {
    if (session) {
      const userProject = await checkUser(session.user.name)
      setUserProjectList(userProject.project)
      setNewProject(false)
      onOpen()
    } else {
      signIn('github')
    }
  }

  const saveProject = async () => {
    if (session) {
      if (props.id) {
        const userProject = await checkUser(session.user.name)
        const userCanEdit = userProject.project.some(
          (e: Project) => e.id === props.id,
        )
        if (userCanEdit === false) {
          setNewProject(true)
          onOpen()
        }
        if (userCanEdit) {
          const projectUpdated = await updateProject()
          if (projectUpdated) {
            toast({
              title: 'Updated project',
              description: 'The project has been updated successfully',
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          } else {
            toast({
              title: 'Error when updated project',
              description: 'An error occured, try again later',
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          }
        }
      } else {
        setNewProject(true)
        onOpen()
      }
    } else {
      signIn('github')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value)
  }

  return (
    <HotKeys allowChanges handlers={handlers} keyMap={keyMap}>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />

      <Metadata />

      <Header
        saveProject={saveProject}
        session={session}
        onOpen={onOpen}
        showUserProjectList={showUserProjectList}
      />

      <DndProvider backend={Backend}>
        <Flex h="calc(100vh - 3rem)">
          {props?.id ? (
            props?.projectExist ? (
              props?.loading ? (
                <Spinner m="0 auto" color="white" size="xl" mt="3rem" />
              ) : (
                <>
                  <Sidebar />
                  <EditorErrorBoundary>
                    <Box bg="white" flex={1} zIndex={10} position="relative">
                      <Editor />
                    </Box>
                  </EditorErrorBoundary>

                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent borderRadius="md" height="400px">
                      <ModalHeader>
                        {newProject ? 'Create new project' : 'Project list'}
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody overflowY="scroll">
                        {newProject ? (
                          <FormControl isRequired>
                            <FormLabel htmlFor="fname">Project name</FormLabel>
                            <Input
                              id="fname"
                              placeholder="Project name"
                              mt="0.5rem"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => handleChange(e)}
                            />
                          </FormControl>
                        ) : userProjectList.length > 0 ? (
                          <List spacing={3}>
                            {userProjectList.map((e: Project, i: number) => {
                              return (
                                <ListItem
                                  textAlign="center"
                                  onClick={() => {
                                    const href = `/project/${e.id}-${e.projectName}`
                                    router.push(href, href, { shallow: true })
                                  }}
                                  backgroundColor="gray.100"
                                  borderRadius={5}
                                  p="0.5rem"
                                  cursor="pointer"
                                  _hover={{ backgroundColor: 'gray.200' }}
                                  fontWeight={600}
                                  fontSize="md"
                                >
                                  {e.id}-{e.projectName}
                                </ListItem>
                              )
                            })}
                          </List>
                        ) : (
                          <Box textAlign="center">
                            <Spinner
                              m="0 auto"
                              color="#319795"
                              size="xl"
                              mt="3rem"
                            />
                          </Box>
                        )}
                      </ModalBody>

                      {newProject ? (
                        <ModalFooter>
                          <Button
                            variantColor="ghost"
                            color="grey"
                            mr={3}
                            onClick={() => onClose()}
                          >
                            Close
                          </Button>
                          <Button
                            variantColor="blue"
                            onClick={() => initProject()}
                          >
                            Create
                          </Button>
                        </ModalFooter>
                      ) : (
                        <ModalFooter>
                          <Button
                            variantColor="ghost"
                            color="grey"
                            mr={3}
                            onClick={() => onClose()}
                          >
                            Close
                          </Button>
                        </ModalFooter>
                      )}
                    </ModalContent>
                  </Modal>

                  <Box
                    maxH="calc(100vh - 3rem)"
                    flex="0 0 15rem"
                    bg="#f7fafc"
                    overflowY="auto"
                    overflowX="visible"
                    borderLeft="1px solid #cad5de"
                  >
                    <InspectorProvider>
                      <Inspector />
                    </InspectorProvider>
                  </Box>
                </>
              )
            ) : (
              <Box m="0 auto" textAlign="center" pt={20}>
                <Alert status="error" mb={20}>
                  <AlertIcon />
                  The project does not exist
                </Alert>
                <Link href="/" color="white">
                  Return to home
                </Link>
              </Box>
            )
          ) : (
            <>
              <Sidebar />
              <EditorErrorBoundary>
                <Box bg="white" flex={1} zIndex={10} position="relative">
                  <Editor />
                </Box>
              </EditorErrorBoundary>

              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent borderRadius="md" height="400px">
                  <ModalHeader>
                    {newProject ? 'Create new project' : 'Project list'}
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody overflowY="scroll">
                    {newProject ? (
                      <FormControl isRequired>
                        <FormLabel htmlFor="fname">Project name</FormLabel>
                        <Input
                          id="fname"
                          placeholder="Project name"
                          mt="0.5rem"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange(e)
                          }
                        />
                      </FormControl>
                    ) : userProjectList.length > 0 ? (
                      <List spacing={3}>
                        {userProjectList.map((e: Project, i: number) => {
                          return (
                            <ListItem
                              textAlign="center"
                              onClick={() => {
                                const href = `/project/${e.id}-${e.projectName}`
                                router.push(href, href, { shallow: true })
                              }}
                              backgroundColor="gray.100"
                              borderRadius={5}
                              p="0.5rem"
                              cursor="pointer"
                              _hover={{ backgroundColor: 'gray.200' }}
                              fontWeight={600}
                              fontSize="md"
                            >
                              {e.id}-{e.projectName}
                            </ListItem>
                          )
                        })}
                      </List>
                    ) : (
                      <Box textAlign="center">
                        <Spinner
                          m="0 auto"
                          color="#319795"
                          size="xl"
                          mt="3rem"
                        />
                      </Box>
                    )}
                  </ModalBody>

                  {newProject ? (
                    <ModalFooter>
                      <Button
                        variantColor="ghost"
                        color="grey"
                        mr={3}
                        onClick={() => onClose()}
                      >
                        Close
                      </Button>
                      <Button variantColor="blue" onClick={() => initProject()}>
                        Create
                      </Button>
                    </ModalFooter>
                  ) : (
                    <ModalFooter>
                      <Button
                        variantColor="ghost"
                        color="grey"
                        mr={3}
                        onClick={() => onClose()}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  )}
                </ModalContent>
              </Modal>

              <Box
                maxH="calc(100vh - 3rem)"
                flex="0 0 15rem"
                bg="#f7fafc"
                overflowY="auto"
                overflowX="visible"
                borderLeft="1px solid #cad5de"
              >
                <InspectorProvider>
                  <Inspector />
                </InspectorProvider>
              </Box>
            </>
          )}
        </Flex>
      </DndProvider>
    </HotKeys>
  )
}

export default App
