import React, { useState, FormEvent } from 'react'
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Spinner,
  ModalFooter,
  Button,
  Switch,
  useToast,
  Text,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionHeader,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  ButtonGroup,
  Flex,
} from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { AiFillProject } from 'react-icons/ai'
import { Project } from '@prisma/client'

interface Props {
  isOpen: boolean
  onClose: () => void
  newProject: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  userProjectList: Project[]
  initProject: () => void
  loading: boolean
  setModalLoading: (value: boolean) => void
  showUserProjectList: () => void
}

interface UpdateProject {
  id: number
  public: boolean
  projectName: string
}

const ModalComponent = (props: Props) => {
  const router = useRouter()
  const toast = useToast()
  const [loadingAdd, setLoadingAdd] = useState(false)

  const updateProject = async (e: UpdateProject) => {
    props.setModalLoading(true)
    let bodyData = {
      project: {
        id: e.id,
        public: e.public,
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
    props.setModalLoading(false)

    return data
  }

  const saveScreenshot = async (e: UpdateProject) => {
    props.setModalLoading(true)
    const response = await fetch('/api/project/takeScreenShot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        pageToScreenshot: `/project/preview/${e.id}-${e.projectName}`,
        id: e.id,
      }),
    })
    props.setModalLoading(false)
    if (response) {
      toast({
        title: 'The project screenshot has been updated',
        description: 'The project screenshot has been updated successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Error when updated screenshot project',
        description: 'An error occured, try again later',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const publishPublicProject = async (e: UpdateProject) => {
    props.setModalLoading(true)

    e.public = !e.public
    const data = {
      id: e.id,
      public: e.public,
      projectName: e.projectName,
    }

    const projectUpdated = await updateProject(data)

    props.setModalLoading(false)

    if (projectUpdated) {
      toast({
        title: 'The project visibility has been updated',
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

  const updateProjectName = async (
    e: Project,
    text: string | FormEvent<any>,
  ) => {
    props.setModalLoading(true)

    const data = {
      id: e.id,
      projectName: text as string,
    }

    const response = await fetch('/api/project/updateProjectName', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const projectUpdated = await response.json()

    if (projectUpdated) {
      props.showUserProjectList()
      toast({
        title: 'The project name has been updated',
        description: 'The project has been updated successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Error when updated project name',
        description: 'An error occured, try again later',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    props.setModalLoading(true)
  }

  const EditableControls = ({ isEditing, onSubmit, onRequestEdit }: any) => {
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm" ml={2}>
        <IconButton
          size="xs"
          icon="check"
          color="black"
          onClick={onSubmit}
          aria-label="submit"
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center" align="center" ml={5}>
        <IconButton
          size="xs"
          icon="edit"
          color="black"
          onClick={onRequestEdit}
          aria-label="edit"
        />
      </Flex>
    )
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent
        borderRadius="md"
        height={props.newProject ? 'unset' : '400px'}
      >
        <ModalHeader>
          {props.newProject ? 'Create new project' : 'Project list'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="scroll">
          {loadingAdd ? (
            <Box textAlign="center">
              <Spinner m="0 auto" color="#319795" size="xl" mt="3rem" />
            </Box>
          ) : props.newProject ? (
            <FormControl isRequired>
              <FormLabel htmlFor="fname">Project name</FormLabel>
              <Input
                id="fname"
                placeholder="Project name"
                mt="0.5rem"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  props.handleChange(e)
                }
              />
            </FormControl>
          ) : props.loading ? (
            <Box textAlign="center">
              <Spinner m="0 auto" color="#319795" size="xl" mt="3rem" />
            </Box>
          ) : props.userProjectList.length > 0 ? (
            <List spacing={3}>
              {props.userProjectList.map((e: Project, i: number) => {
                return (
                  <>
                    <ListItem
                      textAlign="center"
                      backgroundColor="#2E3748"
                      color="white"
                      borderRadius={5}
                      p="0.5rem"
                      cursor="pointer"
                      _hover={{ backgroundColor: 'teal.400' }}
                      fontWeight={600}
                      fontSize="md"
                      mt={3}
                      key={i}
                    >
                      <Accordion defaultIndex={[]} allowMultiple>
                        <AccordionItem borderColor="transparent">
                          <AccordionHeader
                            _hover={{ backgroundColor: 'unset' }}
                            textAlign="center"
                            justifyItems="center"
                            alignItems="center"
                          >
                            <Box
                              as={AiFillProject}
                              size="27px"
                              color="white"
                              display="inline-block"
                              mr={5}
                              width="20%"
                              onClick={() => {
                                setLoadingAdd(true)
                                const href = `/project/${e.id}-${e.projectName}`
                                router.push(
                                  {
                                    pathname: '/project',
                                  },
                                  href,
                                )
                              }}
                            />
                            <Editable
                              display="inline-block"
                              width="70%"
                              textAlign="center"
                              backgroundColor="transparent"
                              defaultValue={e.projectName}
                              fontSize="lg"
                              isPreviewFocusable={false}
                              submitOnBlur={true}
                              onSubmit={(newValue: string | FormEvent<any>) => {
                                updateProjectName(e, newValue)
                              }}
                            >
                              {(props: any) => (
                                <Flex align="center" justify="center">
                                  <EditablePreview />
                                  <EditableInput />
                                  <EditableControls {...props} />
                                </Flex>
                              )}
                            </Editable>

                            <AccordionIcon />
                          </AccordionHeader>
                          <AccordionPanel pb={4}>
                            <Switch
                              color="teal"
                              id="projectPublic"
                              size="md"
                              defaultIsChecked={e.public}
                              onChange={() => publishPublicProject(e)}
                            />
                            {e.public && (
                              <Button
                                variantColor="teal"
                                size="sm"
                                ml={5}
                                onClick={() => saveScreenshot(e)}
                              >
                                Take a screenshot
                              </Button>
                            )}
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </ListItem>
                  </>
                )
              })}
            </List>
          ) : (
            <Box textAlign="center">
              <Text m="0 auto">
                Project list is empty, save a project to display it here
              </Text>
            </Box>
          )}
        </ModalBody>

        {props.newProject ? (
          <ModalFooter>
            <Button
              variantColor="ghost"
              color="grey"
              mr={3}
              onClick={() => props.onClose()}
            >
              Close
            </Button>
            <Button
              variantColor="blue"
              onClick={() => {
                setLoadingAdd(true)
                props.initProject()
              }}
            >
              Create
            </Button>
          </ModalFooter>
        ) : (
          <ModalFooter>
            <Button
              variantColor="white"
              color="grey"
              mr={3}
              onClick={() => props.onClose()}
            >
              Close
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalComponent
