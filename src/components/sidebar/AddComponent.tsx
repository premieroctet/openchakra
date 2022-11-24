import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import API from '~custom-components/api'

const AddComponent = () => {
  const ref = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const createComponent = async () => {
    const res = await API.post('/add-component')
    console.log(res)
  }

  return (
    <Flex alignItems={'center'} justifyContent="space-between">
      <Box flex={1}>
        <Popover
          initialFocusRef={ref}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          placement="right"
        >
          <PopoverTrigger>
            <Button bgColor="teal.500" _hover={{ bgColor: 'teal.300' }}>
              <AddIcon mx={1} />
              <Text
                letterSpacing="wide"
                fontSize="sm"
                textTransform="capitalize"
              >
                Create Component
              </Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent p={5} bgColor="white">
            <PopoverHeader fontWeight="bold">Location</PopoverHeader>
            <PopoverArrow bgColor="white" />
            <PopoverCloseButton />
            <PopoverBody>
              <Input outlineColor="teal" ref={ref}></Input>
            </PopoverBody>
            <PopoverFooter display="flex" justifyContent="flex-end">
              <Button
                bgColor="teal.500"
                _hover={{ bgColor: 'teal.300' }}
                onClick={() => {
                  console.log('clicked')
                  createComponent()
                  onClose()
                }}
              >
                Create
              </Button>
            </PopoverFooter>
            {/* <Form firstFieldRef={firstFieldRef} onCancel={onClose} /> */}
          </PopoverContent>
        </Popover>
      </Box>
    </Flex>
  )
}

export default AddComponent
