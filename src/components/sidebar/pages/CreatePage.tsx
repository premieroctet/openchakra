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
  Textarea,
  Checkbox,
} from '@chakra-ui/react'

const CreatePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        borderRadius={'full'}
        ml={8}
        paddingInline={'6'}
        bgColor="#5bbdc5"
        w={'min-content'}
        alignSelf="center"
        onClick={onOpen}
        colorScheme="teal"
      >
        Create page
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={'white'} minHeight={'70vh'} borderRadius={'3xl'}>
          <ModalHeader
            marginBlockStart={'12'}
            marginBlockEnd={'6'}
            bgColor={'#5bbdc5'}
            color={'white'}
            textAlign="center"
            textTransform={'uppercase'}
          >
            Create page
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            p={8}
            display="flex"
            flexDirection={'column'}
            alignItems={'center'}
          >
            <FormControl mb={2}>
              <FormLabel ml={2}>Name</FormLabel>
              <Input bgColor={'#eee'} borderRadius={'3xl'} />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel ml={2}>Meta Title</FormLabel>
              <Input bgColor={'#eee'} borderRadius={'3xl'} />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel ml={2}>Meta Description</FormLabel>
              <Textarea bgColor={'#eee'} borderRadius={'3xl'} resize="none" />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel ml={2}>Top Image</FormLabel>
              <Input bgColor={'#eee'} borderRadius={'3xl'} />
            </FormControl>
            <FormControl>
              <FormLabel ml={2}>Principale</FormLabel>
              <Checkbox />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={'center'}>
            <Button
              bgColor={'orange.200'}
              paddingBlock={6}
              color="white"
              minW={'60%'}
              borderRadius={'full'}
              _hover={{
                bgColor: 'orange.300',
              }}
              _focus={{
                bgColor: 'orange.300',
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePage
