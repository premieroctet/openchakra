import {
  CircularProgress,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { getShowLoader } from '~core/selectors/app'

const Loader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const showLoader = useSelector(getShowLoader)
  return (
    <Modal isOpen={showLoader} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="0"
      >
        <Text fontSize="xl" as="b" fontFamily="sans-serif" color="black">
          Loading...
        </Text>
        <CircularProgress isIndeterminate color="teal.500" />
      </ModalContent>
    </Modal>
  )
}

export default Loader
