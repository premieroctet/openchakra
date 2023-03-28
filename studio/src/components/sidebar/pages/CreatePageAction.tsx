import React from 'react'
import {
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import PageSettings from './PageSettings'

const CreatePageAction = () => {
  const {  onOpen, isOpen, onClose } = useDisclosure()

  return (
    <>
    <Button
      borderRadius={'full'}
      paddingInline={'6'}
      bgColor="#5bbdc5"
      color={'white'}
      w={'min-content'}
      alignSelf="center"
      onClick={onOpen}
      colorScheme="teal"
    >
      Create page
    </Button>
    <PageSettings isOpen={isOpen} onClose={onClose} create />
  </>
  )
}

export default CreatePageAction
