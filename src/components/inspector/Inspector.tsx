import React, { useState, memo, useEffect, useMemo } from 'react'
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
} from '@chakra-ui/react'
import { CopyIcon, CheckIcon, EditIcon } from '@chakra-ui/icons'
import Panels from '~components/inspector/panels/Panels'
import { GoRepo, GoCode } from 'react-icons/go'
import { FiTrash2 } from 'react-icons/fi'
import { IoMdRefresh } from 'react-icons/io'
import { useSelector } from 'react-redux'
import useDispatch from '~hooks/useDispatch'
import StylesPanel from '~components/inspector/panels/StylesPanel'
import {
  getSelectedComponent,
  getComponents,
  getSelectedComponentId,
  getComponentNames,
} from '~core/selectors/components'
import ActionButton from './ActionButton'
import { generateComponentCode, formatCode } from '~utils/code'
import useClipboard from '~hooks/useClipboard'
import { useInspectorUpdate } from '~contexts/inspector-context'
import { componentsList } from '~componentsList'

const CodeActionButton = memo(() => {
  const [isLoading, setIsLoading] = useState(false)
  const { onCopy, hasCopied } = useClipboard()

  const selectedId = useSelector(getSelectedComponentId)
  const components = useSelector(getComponents)

  const parentId = components[selectedId].parent
  const parent = { ...components[parentId] }
  // Do not copy sibling components from parent
  parent.children = [selectedId]

  return (
    <ActionButton
      isLoading={isLoading}
      label="Copy code component"
      colorScheme={hasCopied ? 'green' : 'gray'}
      onClick={async () => {
        setIsLoading(true)
        const code = await generateComponentCode({
          component: parent,
          components,
          componentName: components[selectedId].componentName,
          forceBuildBlock: true,
        })
        onCopy(await formatCode(code))
        setIsLoading(false)
      }}
      icon={hasCopied ? <CheckIcon path="" /> : <GoCode />}
    />
  )
})

CodeActionButton.displayName = 'CodeActionButton'

const Inspector = () => {
  const dispatch = useDispatch()
  const component = useSelector(getSelectedComponent)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [componentName, onChangeComponentName] = useState('')
  const componentsNames = useSelector(getComponentNames)

  const { clearActiveProps } = useInspectorUpdate()

  const saveComponent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch.components.setComponentName({
      componentId: component.id,
      name: componentName,
    })
    onClose()
    onChangeComponentName('')
  }
  const isValidComponentName = useMemo(() => {
    return (
      !!componentName.match(/^[A-Z]\w*$/g) &&
      !componentsNames.includes(componentName) &&
      // @ts-ignore
      !componentsList.includes(componentName)
    )
  }, [componentName, componentsNames])

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
          boxShadow="sm"
          bg="yellow.100"
          display="flex"
          justifyContent="space-between"
          flexDir="column"
        >
          {isRoot ? 'Document' : type}
          {!!component.componentName && (
            <Text fontSize="xs" fontWeight="light">
              {component.componentName}
            </Text>
          )}
        </Box>
        {!isRoot && (
          <Stack
            direction="row"
            py={2}
            spacing={2}
            align="center"
            zIndex={99}
            px={2}
            flexWrap="wrap"
            justify="flex-end"
          >
            <CodeActionButton />
            {!component.componentName && (
              <ActionButton
                label="Name component"
                icon={<EditIcon path="" />}
                onClick={onOpen}
              />
            )}
            <ActionButton
              label="Duplicate"
              onClick={() => dispatch.components.duplicate()}
              icon={<CopyIcon path="" />}
            />
            <ActionButton
              label="Reset props"
              icon={<IoMdRefresh />}
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
              icon={<GoRepo />}
            />
            <ActionButton
              bg="red.500"
              label="Remove"
              onClick={() => dispatch.components.deleteComponent(component.id)}
              icon={<FiTrash2 />}
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
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay>
          <ModalContent>
            <form onSubmit={saveComponent}>
              <ModalHeader>Save this component</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isInvalid={!isValidComponentName}>
                  <FormLabel>Component name</FormLabel>
                  <Input
                    size="md"
                    autoFocus
                    variant="outline"
                    width="100%"
                    focusBorderColor="blue.500"
                    errorBorderColor="red.500"
                    value={componentName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onChangeComponentName(e.target.value)
                    }
                  />
                  {!isValidComponentName && (
                    <FormErrorMessage>
                      Component name must start with a capital character and
                      must not contain space or special character, and name
                      should not be already taken (including existing chakra-ui
                      components).
                    </FormErrorMessage>
                  )}
                  <FormHelperText>
                    This will name your component that you will see in the code
                    panel as a separated component.
                  </FormHelperText>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                  isDisabled={!isValidComponentName}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}

export default Inspector
