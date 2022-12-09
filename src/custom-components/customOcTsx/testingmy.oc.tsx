import React, { RefObject } from 'react'
import {
  ChakraProvider,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Button,
  Link,
  Image
} from '@chakra-ui/react'

const App = () => (
  <>
    <Popover isOpen placement="right">
      <PopoverTrigger>
        <Button variant="solid" size="md">
          Button text
        </Button>
      </PopoverTrigger>
      <PopoverContent backgroundColor="gray.500" color="#319795">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Popover Title</PopoverHeader>
        <PopoverBody fontSize="sm" textAlign="center">
          This is the body of my popover
        </PopoverBody>
        <PopoverFooter>
          <Button variant="ghost" size="sm">
            Confirm!
          </Button>
        </PopoverFooter>
        <Link href="jhb">Link text</Link>
        <Image height="100px" width="100px" src="sjjjk" />
      </PopoverContent>
    </Popover>
  </>
)

export default App
