import { AddIcon, DownloadIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import API from '~custom-components/api'
import useDispatch from '~hooks/useDispatch'

const regex = /^[a-z@][a-z0-9-_$!/.]*$/

const InstallComponent = () => {
  const ref = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const componentValid = (
    componentPath: string | undefined = ref.current?.value,
  ) => {
    if (componentPath === undefined || componentPath.length === 0) return false
    return componentPath
      .split('/')
      .reduce((acc, word) => acc && regex.test(word), true)
  }

  const installComponent = async () => {
    const componentPath: string = ref.current? ref.current.value : ''
    if (!componentValid(componentPath)) return
    onClose()
    dispatch.app.toggleLoader()
    const res = await API.post('/install-component', {
      path: componentPath,
    })
    dispatch.customComponents.updateInstalledComponents(componentPath, true)
    dispatch.app.toggleLoader()
  }

  return (
    <Popover
      initialFocusRef={ref}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
    >
      <PopoverTrigger>
        <Button
          bgColor="teal.500"
          _hover={{ bgColor: 'teal.300' }}
          color="white"
          leftIcon={<DownloadIcon />}
        >
          <Text letterSpacing="wide" fontSize="sm" textTransform="capitalize">
            Install
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent p={5} bgColor="white">
        <PopoverArrow bgColor="white" />
        <PopoverCloseButton />
        <PopoverBody>
          <FormControl isRequired isInvalid={!componentValid()}>
            <FormLabel fontWeight="bold">Location</FormLabel>
            <Input
              outlineColor="teal"
              ref={ref}
              placeholder="<package-name>"
              _placeholder={{ color: 'gray.400' }}
              size="sm"
            />
            <FormErrorMessage>
              package names can only contain alphanumeric, lowercase characters,
              and the following [@, ., -, _, $, !, /]
            </FormErrorMessage>
          </FormControl>
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <Button
            colorScheme="teal"
            color="teal.500"
            variant="outline"
            onClick={() => {
              installComponent()
            }}
          >
            Install
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default InstallComponent
