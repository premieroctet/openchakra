import React, { useState, memo, useEffect } from 'react'
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
  FormHelperText,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/core'
import Panels from './panels/Panels'
import { GoRepo, GoCode } from 'react-icons/go'
import { FiTrash2 } from 'react-icons/fi'
import { IoMdRefresh, IoMdSave } from 'react-icons/io'
import { useSelector } from 'react-redux'
import useDispatch from '../../hooks/useDispatch'
import StylesPanel from './panels/StylesPanel'
import {
  getSelectedComponent,
  getComponents,
  getSelectedComponentId,
  getUserComponents,
} from '../../core/selectors/components'
import ActionButton from './ActionButton'
import { generateComponentCode } from '../../utils/code'
import useClipboard from '../../hooks/useClipboard'
import { useInspectorUpdate } from '../../contexts/inspector-context'

const CodeActionButton = memo(() => {
  const [isLoading, setIsLoading] = useState(false)
  const { onCopy, hasCopied } = useClipboard()

  const selectedId = useSelector(getSelectedComponentId)
  const components = useSelector(getComponents)
  const userComponents = useSelector(getUserComponents)

  const parentId = components[selectedId].parent
  const parent = { ...components[parentId] }
  // Do not copy sibling components from parent
  let name: string | undefined
  if (components[selectedId].instanceOf) {
    parent.children = [components[selectedId].instanceOf!]
    name = components[components[selectedId].instanceOf!].userComponentName
  } else {
    parent.children = [selectedId]
  }

  return (
    <ActionButton
      isLoading={isLoading}
      label="Copy code component"
      variantColor={hasCopied ? 'green' : 'gray'}
      onClick={async () => {
        setIsLoading(true)
        const code = await generateComponentCode({
          component: parent,
          components,
          name,
          userComponents,
          forceBuildBlock: true,
        })
        onCopy(code)
        setIsLoading(false)
      }}
      icon={hasCopied ? 'check' : GoCode}
    />
  )
})

const Inspector = () => {
  const dispatch = useDispatch()
  const component = useSelector(getSelectedComponent)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [componentName, onChangeComponentName] = useState('')
  const initialRef = React.useRef<HTMLInputElement>(null)
  const saveComponent = () => {
    dispatch.components.saveUserComponent({
      componentId: component.id,
      name: componentName,
    })
    onClose()
    onChangeComponentName('')
  }

  const { clearActiveProps } = useInspectorUpdate()

  const { type, rootParentType, id, children } = component

  const isRoot = id === 'root'
  const parentIsRoot = component.parent === 'root'

  const docType = rootParentType || type
  const componentHasChildren = children.length > 0

  useEffect(() => {
    clearActiveProps()
  }, [clearActiveProps])

  return (
    <>
      <Box bg="white">
        <Box
          fontWeight="semibold"
          fontSize="md"
          color="yellow.900"
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
            spacing={4}
            align="center"
            zIndex={99}
            px={2}
            flexWrap="wrap"
            justify="flex-end"
          >
            <CodeActionButton />
            <ActionButton
              label="Duplicate"
              onClick={() => dispatch.components.duplicate()}
              icon="copy"
            />
            <ActionButton label="Component" onClick={onOpen} icon={IoMdSave} />
            <ActionButton
              label="Reset props"
              icon={IoMdRefresh}
              onClick={() => dispatch.components.resetProps(component.id)}
            />
            <ActionButton
              label="Chakra UI Doc"
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

      <Box pb={1} bg="white" px={3}>
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
