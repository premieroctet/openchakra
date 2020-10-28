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

interface Props {
  id: number
  loading: boolean
}

interface Project {
  createdAt: string
  updatedAt: string
  userId: number
  id: number
  markup: string
  projectName: string
}

const App = (props: Props) => {
  const { handlers } = useShortcuts()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [projectName, setProjectName] = useState('')
  const components = useSelector(getComponents)
  const [session] = useSession()
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
        window.location.href = `/project/${newProject.id}-${newProject.projectName}`
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

  const saveProject = async () => {
    if (session) {
      if (props.id) {
        let userCanEdit = false
        const userProject = await checkUser(session.user.name)
        userProject.project.map((e: Project) => {
          if (e.id === props.id) {
            userCanEdit = true
          }
          return
        })
        if (userCanEdit === false) {
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
        onOpen()
      }
    } else {
      signIn()
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

      <Header saveProject={saveProject} />

      <DndProvider backend={Backend}>
        <Flex h="calc(100vh - 3rem)">
          {props?.loading ? (
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
                <ModalContent borderRadius="md">
                  <ModalHeader>Create new project</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
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
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      variantColor="ghost"
                      color="grey"
                      mr={3}
                      onClick={onClose}
                    >
                      Close
                    </Button>
                    <Button variantColor="blue" onClick={() => initProject()}>
                      Create
                    </Button>
                  </ModalFooter>
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
