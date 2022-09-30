import React from 'react'
import { ChakraProvider, Button } from '@chakra-ui/react'

const App = () => (
  <ChakraProvider resetCSS>
    <Button variant="solid" size="md">
      Button text
    </Button>
  </ChakraProvider>
)

export default App
