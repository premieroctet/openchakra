import React from 'react'
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
} from '@chakra-ui/core'
import { useRouter } from 'next/router'

interface Project {
  createdAt: string
  updatedAt: string
  userId: number
  id: number
  markup: string
  projectName: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  newProject: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  userProjectList: Project[]
  initProject: () => void
}

const ModalComponent = (props: Props) => {
  const router = useRouter()

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="md" height="400px">
        <ModalHeader>
          {props.newProject ? 'Create new project' : 'Project list'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="scroll">
          {props.newProject ? (
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
          ) : props.userProjectList.length > 0 ? (
            <List spacing={3}>
              {props.userProjectList.map((e: Project, i: number) => {
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
              <Spinner m="0 auto" color="#319795" size="xl" mt="3rem" />
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
            <Button variantColor="blue" onClick={() => props.initProject()}>
              Create
            </Button>
          </ModalFooter>
        ) : (
          <ModalFooter>
            <Button
              variantColor="ghost"
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
