import React, { RefObject } from 'react'
import { ChakraProvider, Box, Center, Button, Text } from '@chakra-ui/react'

const App = () => (
  <>
    <Center
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      m={16}
      p={8}
      backgroundColor="cyan.100"
      bgGradient="linear(to right, green.200,blue.500)"
    >
      <Text opacity={1} fontWeight="bold" fontSize="lg" letterSpacing="widest">
        Some text blah blah blah
      </Text>
      <Button
        variant="ghost"
        size="md"
        bgGradient="linear(to right, messenger.500,green.500)"
        borderRadius={100}
        border={20}
      >
        Test button
      </Button>
    </Center>
  </>
)

export default App
