import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import API from '~custom-components/api'
import useDispatch from '~hooks/useDispatch'


const InstalledPropTable = (param: string) => {
  const ref = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
//   console.log(JSON.parse(param)
  let newProp = JSON.stringify(param);
  let newJson = JSON.parse(newProp);
    // console.log(JSON.parse(newJson['param']))
    // const listItems = newJson.map((number) =>
    //     <li>{number}</li>
    //   );

  return (
    <Button>+</Button>
  )
}

export default InstalledPropTable
