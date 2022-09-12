import React from 'react'
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  LightMode,
  PopoverFooter,
} from '@chakra-ui/react'
import { SmallCloseIcon, CheckIcon } from '@chakra-ui/icons'
import useDispatch from '~hooks/useDispatch'

const Clear = () => {
  const dispatch = useDispatch()

  return (
    <Popover>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              // rightIcon={<SmallCloseIcon path="" />}
              size="xs"
              variant="ghost"
              color={'white'}
              _hover={{
                backgroundColor: 'teal.500',
              }}
            >
              <img src="/icons/clear.svg" height={30} alt="" />
            </Button>
          </PopoverTrigger>
          <LightMode>
            <PopoverContent zIndex={100} bg="white">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Are you sure?</PopoverHeader>
              <PopoverBody fontSize="sm">
                Do you really want to remove all components on the editor?
              </PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  rightIcon={<CheckIcon path="" />}
                  onClick={() => {
                    dispatch.components.reset()
                    if (onClose) {
                      onClose()
                    }
                  }}
                >
                  Yes, clear
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </LightMode>
        </>
      )}
    </Popover>
  )
}

export default Clear
