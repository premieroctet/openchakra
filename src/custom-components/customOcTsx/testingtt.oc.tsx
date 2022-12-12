import React, { RefObject } from 'react'
import {
  ChakraProvider,
  Box,
  ActionCard,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Button
} from '@chakra-ui/react'

const App = () => (
  <>
    <ActionCard />
    <Popover isOpen>
      <PopoverTrigger>
        <Button variant="solid" size="md">
          Button text
        </Button>
      </PopoverTrigger>
      <PopoverContent width="6vw">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Popover Title</PopoverHeader>
        <PopoverBody>This is the body of my popover</PopoverBody>
        <PopoverFooter>
          <Button variant="ghost" size="sm">
            Confirm!
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  </>
)

export default App
