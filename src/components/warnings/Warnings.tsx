import { CopyIcon, CheckIcon, EditIcon } from '@chakra-ui/icons'
import { FiTrash2 } from 'react-icons/fi'
import { GoRepo, GoCode } from 'react-icons/go'
import { IoMdRefresh } from 'react-icons/io'
import {
  Link,
  Box,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  ModalFooter,
  Button,
  useDisclosure,
  Text,
  List,
  ListItem,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { useState, memo, useEffect, useMemo } from 'react'
import styled from 'styled-components'

import { componentsList } from '~componentsList'
import { generateComponentCode, formatCode } from '~utils/code'
import {
  getSelectedComponent,
  getComponents,
  getSelectedComponentId,
  getComponentNames,
} from '~core/selectors/components'
import { getShowWarnings } from '~core/selectors/app'
import { getWarnings } from '~core/selectors/components'
import { useInspectorUpdate } from '~contexts/inspector-context'
import Panels from '~components/inspector/panels/Panels'
import StylesPanel from '~components/inspector/panels/StylesPanel'
import useClipboard from '~hooks/useClipboard'
import useDispatch from '~hooks/useDispatch'

import WarningItem from './WarningItem';

const Warnings = () => {
  const dispatch = useDispatch()
  const warnings = useSelector(getWarnings)
  const showWarnings = useSelector(getShowWarnings)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [componentName, onChangeComponentName] = useState('')
  const componentsNames = useSelector(getComponentNames)

  const { clearActiveProps } = useInspectorUpdate()

  const saveComponent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch.project.setComponentName({
      componentId: component.id,
      name: componentName,
    })
    onClose()
    onChangeComponentName('')
  }

  return (
    //@ts-ignore
    <RightPanel show={showWarnings}>
      <Box bg="white">
        <Box
          fontWeight="semibold"
          fontSize="md"
          color={'white'}
          py={2}
          px={2}
          boxShadow="sm"
          bg="#5bbdc5"
          display="flex"
          justifyContent="space-between"
          flexDir="column"
        >
          Warnings
        </Box>
        <List>
          {warnings.map(w => <WarningItem warning={w} />)}
        </List>
      </Box>
    </RightPanel>
  )
}

const RightPanel = styled.div`
  --inspector-width: 240px;
  width: ${props =>
    //@ts-ignore
    props.show ? 'var(--inspector-width)' : 0};
  transition: all 0.2s ease-in-out;
  transform: ${props =>
    //@ts-ignore
    props.show ? 'none' : 'translateX(calc(var(--inspector-width)))'};
  transition: all 0.2s ease-in-out;
`

export default Warnings
