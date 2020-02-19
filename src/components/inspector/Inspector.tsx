import React, { useState } from 'react'
import {
  Link,
  Box,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  ModalFooter,
  Button,
  Tooltip,
  Flex,
} from '@chakra-ui/core'

import Panels from './panels/Panels'
import { GoRepo } from 'react-icons/go'
import { FiTrash2 } from 'react-icons/fi'
import { IoMdRefresh, IoMdSave } from 'react-icons/io'
import { FaUnlink } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import useDispatch from '../../hooks/useDispatch'
import QuickPropsPanel from './QuickPropsPanel'
import StylesPanel from './panels/StylesPanel'
import { getSelectedComponent } from '../../core/selectors/components'
import ActionButton from './ActionButton'

const Inspector = () => {
  const dispatch = useDispatch()
  const component = useSelector(getSelectedComponent)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [componentName, onChangeComponentName] = useState('')
  const initialRef = React.useRef<HTMLInputElement>(null)
  const saveComponent = (e: React.FormEvent) => {
    dispatch.components.saveComponent({ id: component.id, name: componentName })
    onClose()
    onChangeComponentName('')
  }

  const onDetachComponent = () => {
    dispatch.components.detachUserComponent(component.id)
  }

  const { type, rootParentType, id, children } = component

  const isRoot = id === 'root'
  const parentIsRoot = component.parent === 'root'

  const docType = rootParentType || type
  const componentHasChildren = children.length > 0

  return (
    <>
      <Box bg="white">
        <Box
          fontWeight="semibold"
          fontSize="md"
          color="yellow.900"
          rounded="md"
          py={2}
          px={2}
          shadow="sm"
          bg="yellow.100"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {isRoot ? 'Document' : type}
        </Box>
        {!isRoot && (
          <Stack
            isInline
            py={2}
            align="center"
            zIndex={99}
            px={2}
            flexWrap="wrap"
            justify="flex-end"
          >
            {!!component.masterComponentName && (
              <Flex justifySelf="flex-start" direction="row" flex={1} ml={2}>
                <Tooltip
                  label="Detach component"
                  aria-label="Detach component"
                  zIndex={11}
                  hasArrow
                >
                  <Button
                    size="xs"
                    rightIcon={FaUnlink}
                    maxW={40}
                    variant="outline"
                    variantColor="orange"
                    onClick={onDetachComponent}
                  >
                    {component.masterComponentName}
                  </Button>
                </Tooltip>
              </Flex>
            )}
            <ActionButton
              label="Add to user components"
              placement="right-end"
              icon={IoMdSave}
              onClick={onOpen}
            />
            <ActionButton
              label="Duplicate"
              onClick={() => dispatch.components.duplicate()}
              icon="copy"
            />
            <ActionButton
              label="Reset"
              icon={IoMdRefresh}
              onClick={() => dispatch.components.resetProps(component.id)}
            />
            <ActionButton
              label="Doc"
              as={Link}
              onClick={() => {
                window.open(
                  `https://chakra-ui.com/${docType.toLowerCase()}`,
                  '_blank',
                )
              }}
              icon={GoRepo}
            />
            <ActionButton
              bg="red.500"
              label="Remove"
              onClick={() => dispatch.components.deleteComponent(component.id)}
              icon={FiTrash2}
            />
          </Stack>
        )}
      </Box>

      <Box bg="white" px={3}>
        {!isRoot && <QuickPropsPanel />}
        <Panels component={component} isRoot={isRoot} />
      </Box>

      <StylesPanel
        isRoot={isRoot}
        showChildren={componentHasChildren}
        parentIsRoot={parentIsRoot}
      />

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={saveComponent}>
            <ModalHeader>Save this component</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Component name</FormLabel>
                <Input
                  size="md"
                  as="input"
                  variant="outline"
                  isFullWidth
                  focusBorderColor="blue.500"
                  errorBorderColor="red.500"
                  ref={initialRef}
                  value={componentName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeComponentName(e.target.value)
                  }
                />
                <FormHelperText>
                  This will save this component in the library and allow to
                  reuse it later.
                </FormHelperText>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button variantColor="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Inspector
