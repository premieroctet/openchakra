import React from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  ListItem,
  List,
  Portal,
} from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { getComponentParamNames } from '~core/selectors/components'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'

const ParamSelector = ({ prop }: any) => {
  const params = useSelector(getComponentParamNames)
  const { setValue } = useForm()
  const value = usePropsSelector(prop)
  return (
    <span>
      <Popover placement="left" trigger="hover">
        <PopoverTrigger>
          <ChevronLeftIcon color="black" />
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            color="black"
            borderColor="gray.200"
            className="paramSelector"
          >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader borderColor="gray.200">
              Select parameter
            </PopoverHeader>
            <PopoverBody>
              <List>
                {params?.map((param: string) => (
                  <ListItem
                    onClick={() => setValue(prop, `{${param}}`)}
                    key={param}
                    px={1}
                    _hover={{ bg: 'teal.100' }}
                  >
                    {param}
                  </ListItem>
                ))}
              </List>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </span>
  )
}

export default ParamSelector
