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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  extendTheme,
  theme as baseTheme,
} from '@chakra-ui/react'
import React from 'react'

const ThemeTable = () => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Component</Th>
            <Th>Default ColorScheme</Th>
            <Th>Default Size</Th>
            <Th>Default Variant</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              gap={2}
            >
              Default (Applies to all components)
            </Td>
            <Td>conf</Td>
            <Td>conf</Td>
            <Td>conf</Td>
          </Tr>
          <Tr>
            <Td
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              gap={2}
            >
              <Button variant="solid">Solid Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="link">Link Button</Button>
              <Button variant="unstyled">Unstyled Button</Button>
            </Td>
            <Td>conf</Td>
            <Td>conf</Td>
            <Td>conf</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

const Themer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <ChakraProvider
      resetCSS
      theme={extendTheme({
        colors: {
          brand: baseTheme.colors.red,
        },
        components: {
          Button: {
            defaultProps: {
              colorScheme: 'blue',
            },
          },
        },
      })}
    >
      <Button
        px={6}
        bgGradient="linear(to-br, blue.300, green.300, yellow.300, red.300)"
        display="flex"
        flexDirection="row"
        alignItems="center"
        fontSize="sm"
        whiteSpace="nowrap"
        _hover={{
          bgGradient: 'linear(to-br, blue.200, green.200, yellow.200, red.200)',
        }}
        onClick={onOpen}
        color="black"
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
            <ThemeTable />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  )
}

export default Themer
