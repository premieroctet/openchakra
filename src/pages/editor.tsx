import React, { useState } from 'react'
import {
  Flex,
  Box,
  Spinner,
  useDisclosure,
  useToast,
  Alert,
  AlertIcon,
  Link,
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
import ModalComponent from '~components/ModalComponent'
import { Project } from '@prisma/client'

const EditorPage = (props: {
  id: number
  projectExist: boolean
  projectName: string
  validated: boolean
  public: boolean
  loading: boolean
}) => {
  const { handlers } = useShortcuts()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [projectName, setProjectName] = useState('')
  const [newProject, setNewProject] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [userProjectList, setUserProjectList] = useState([])
  const components = useSelector(getComponents)
  const [session] = useSession()
  const router = useRouter()
  const toast = useToast()

  const updateProject = async () => {
    setLoading(true)
    const markup = JSON.stringify(components)
    let bodyData = {
      project: {
        markup: markup,
        id: props.id,
        projectName: props.projectName,
        validated: props.validated,
        accessToken: session?.accessToken as string,
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
    setLoading(false)
    return data
  }

  const initProject = async () => {
    if (projectName.length > 0) {
      const markup = JSON.stringify(components)
      let newProject = await createProject(
        markup,
        projectName,
        session?.accessToken as string,
      )
      if (newProject) {
        toast({
          title: 'Created project',
          description: 'The project has been created successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        const href = `/project/${newProject.id}-${newProject.projectName}`
        router.push(href, href)
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
    setModalLoading(true)
    onOpen()
    if (session) {
      const userProject = await checkUser(session.accessToken as string)
      setUserProjectList(userProject.project)
      setNewProject(false)
    } else {
      signIn('github', {
        callbackUrl: process.env.NEXTAUTH_URL as string,
      })
    }
    setModalLoading(false)
  }

  const saveProject = async () => {
    setLoading(true)
    if (session) {
      if (props.id) {
        const userProject = await checkUser(session.accessToken as string)
        const userCanEdit = userProject.project.some(
          (e: Project) => e.id === props.id,
        )
        if (userCanEdit === false) {
          setNewProject(true)
          onOpen()
        } else if (userCanEdit) {
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
      signIn('github', {
        callbackUrl: process.env.NEXTAUTH_URL as string,
      })
    }
    setLoading(false)
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
        projectPage={false}
      />

      <DndProvider backend={Backend}>
        <Flex h="calc(100vh - 3rem)">
          {props.loading ? (
            <Box
              width="100%"
              height="100%"
              position="absolute"
              zIndex={10000}
              top="0%"
              left="0%"
              backgroundColor="rgba(46, 55, 72, 0.3)"
              textAlign="center"
            >
              <Spinner m="0 auto" color="blue" size="xl" mt="3rem" />
            </Box>
          ) : props?.id ? (
            props?.projectExist ? (
              <>
                <Sidebar />

                {/* @ts-ignore */}
                <EditorErrorBoundary>
                  <Box bg="white" flex={1} zIndex={10} position="relative">
                    <Editor />
                    {loading && (
                      <Box
                        width="100%"
                        height="100%"
                        position="absolute"
                        zIndex={10000}
                        top="0%"
                        left="0%"
                        backgroundColor="rgba(46, 55, 72, 0.3)"
                        textAlign="center"
                      >
                        <Spinner m="0 auto" color="blue" size="xl" mt="3rem" />
                      </Box>
                    )}
                  </Box>
                </EditorErrorBoundary>

                <ModalComponent
                  isOpen={isOpen}
                  onClose={onClose}
                  newProject={newProject}
                  handleChange={handleChange}
                  userProjectList={userProjectList}
                  initProject={initProject}
                  loading={modalLoading}
                  setModalLoading={setModalLoading}
                  showUserProjectList={showUserProjectList}
                  accessToken={session?.accessToken as string}
                />

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

              {/* @ts-ignore */}
              <EditorErrorBoundary>
                <Box bg="white" flex={1} zIndex={10} position="relative">
                  <Editor />
                  {loading && (
                    <Box
                      width="100%"
                      height="100%"
                      position="absolute"
                      zIndex={10000}
                      backgroundColor="rgba(46, 55, 72, 0.3)"
                      textAlign="center"
                    >
                      <Spinner m="0 auto" color="white" size="xl" mt="3rem" />
                    </Box>
                  )}
                </Box>
              </EditorErrorBoundary>
              <ModalComponent
                isOpen={isOpen}
                onClose={onClose}
                newProject={newProject}
                handleChange={handleChange}
                userProjectList={userProjectList}
                initProject={initProject}
                loading={modalLoading}
                setModalLoading={setModalLoading}
                showUserProjectList={showUserProjectList}
                accessToken={session?.accessToken as string}
              />
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

export default EditorPage
