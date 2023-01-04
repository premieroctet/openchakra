import {
  Button,
  FormControl,
  FormErrorMessage,
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
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import API from '~custom-components/api'
import useDispatch from '~hooks/useDispatch'
import { BiGitCommit } from 'react-icons/bi'

const DeployButton = () => {
  const ref = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const messageValid = (
    commitMessage: string | undefined = ref.current?.value,
  ) => {
    if (
      commitMessage === undefined ||
      commitMessage.length === 0 ||
      commitMessage.length >= 50
    )
      return false
    return true
  }

  const deploy = async () => {
    const commitMessage: string = ref.current ? ref.current.value : ''
    if (!messageValid(commitMessage)) return
    onClose()
    dispatch.app.toggleLoader()
    await API.post('/deploy', {
      message: commitMessage,
    })
    dispatch.app.toggleLoader()
  }

  return (
    <Popover
      initialFocusRef={ref}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom"
    >
      <PopoverTrigger>
        <Button
          display="flex"
          flexDirection="row"
          alignItems="center"
          rightIcon={<BiGitCommit />}
          variant="ghost"
          size="xs"
        >
          <Tooltip
            label="Commit and push to git"
            fontFamily="sans-serif"
            fontSize="sm"
            hasArrow
            placement="bottom"
          >
            <Text letterSpacing="wide" fontSize="xs" textTransform="capitalize">
              Deploy
            </Text>
          </Tooltip>
        </Button>
      </PopoverTrigger>
      <PopoverContent p={5} bgColor="white" color="black">
        <PopoverArrow bgColor="white" />
        <PopoverCloseButton />
        <PopoverBody>
          <FormControl isRequired isInvalid={!messageValid()}>
            <FormLabel fontWeight="bold">Commit Message</FormLabel>
            <Input
              outlineColor="teal"
              ref={ref}
              placeholder="<commit-message>"
              _placeholder={{ color: 'gray.400' }}
              size="sm"
            />
            <FormErrorMessage>
              commit message length should be between 1-50
            </FormErrorMessage>
          </FormControl>
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <Button
            colorScheme="teal"
            color="teal.500"
            variant="outline"
            onClick={() => {
              deploy()
            }}
          >
            Deploy
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default DeployButton
