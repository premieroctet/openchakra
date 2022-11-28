import {
  Button,
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

const Themer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <ChakraProvider resetCSS>
      <Button
        px={6}
        bgGradient="linear(to-br, teal.50, teal.500)"
        display="flex"
        flexDirection="row"
        alignItems="center"
        fontSize="sm"
        whiteSpace="nowrap"
        _hover={{ bgGradient: 'linear(to-tl, green.200, pink.500)' }}
        onClick={onOpen}
      >
        Theme
      </Button>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="xl">
        <DrawerOverlay />
        <DrawerContent bgColor="white">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Customize Project Theme
          </DrawerHeader>
          <DrawerBody>
            <Button variant="solid"> Button </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  )
}

export default Themer
