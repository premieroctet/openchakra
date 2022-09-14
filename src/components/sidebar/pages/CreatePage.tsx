import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'

const CreatePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        borderRadius={'full'}
        paddingInline={'6'}
        bg="teal.300"
        w={'min-content'}
        alignSelf="center"
        onClick={onOpen}
      >
        Create page
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={'white'} borderRadius={'3xl'}>
          <ModalHeader
            marginBlockStart={'12'}
            marginBlockEnd={'6'}
            bg={'teal.400'}
            color={'white'}
            textAlign="center"
            textTransform={'uppercase'}
          >
            Create page
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Meta Title</FormLabel>
              <Input placeholder="Title" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Meta Description</FormLabel>
              <Input placeholder="Description" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePage
