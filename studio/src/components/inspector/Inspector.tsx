import React, { useState, memo, useEffect, useMemo } from 'react'
import lodash from 'lodash'
import { CheckIcon, CopyIcon, EditIcon, WarningIcon, SearchIcon } from '@chakra-ui/icons';
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
  Tooltip,
  Flex,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { componentsList } from '~componentsList'
import { generateComponentCode, formatCode } from '~utils/code'
import {
  getSelectedComponent,
  getComponents,
  getSelectedComponentId,
  getComponentNames,
} from '~core/selectors/components'
import { getShowRightPanel } from '~core/selectors/app'
import { useInspectorUpdate } from '~contexts/inspector-context'
import Panels from '~components/inspector/panels/Panels'
import StylesPanel from '~components/inspector/panels/StylesPanel'
import useClipboard from '~hooks/useClipboard'
import useDispatch from '~hooks/useDispatch'

import {
  getComponentWarnings,
  getPages,
} from '../../core/selectors/components';
import {
  getModels,
} from '../../core/selectors/dataSources';
import ActionButton from './ActionButton'

const CodeActionButton = memo(() => {
  const [isLoading, setIsLoading] = useState(false)
  const { onCopy, hasCopied } = useClipboard()

  const selectedId = useSelector(getSelectedComponentId)
  const components = useSelector(getComponents)
  const pages = useSelector(getPages)
  const models = useSelector(getModels)

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
          pages,
          models
        })
        onCopy(await formatCode(code))
        setIsLoading(false)
      }}
      icon={hasCopied ? <CheckIcon path="" /> : <GoCode />}
    />
  )
})

const Inspector = () => {
  const dispatch = useDispatch()
  const component = useSelector(getSelectedComponent)
  const showRightPanel = useSelector(getShowRightPanel)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [componentName, onChangeComponentName] = useState('')
  const componentsNames = useSelector(getComponentNames)
  const components = useSelector(getComponents)

  const [isModalSearchOpen, setModalSearchOpen] = useState(false)

  const warnings = []//useSelector(getComponentWarnings(component)) TODO reimplement

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
    //@ts-ignore
    <RightPanel show={showRightPanel}>
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
          <Flex justifyContent="space-between">
          {isRoot ? 'Document' : type}<br/>{component.id}
          <SearchIcon
            onClick={() => {
              setModalSearchOpen(true)
            }}
          />
          {warnings.length>0 ?
            <Tooltip label={<Box>{warnings.map(w => <p>{w.message}</p>)}</Box>}>
              <WarningIcon color='red.500' />
            </Tooltip>:null
          }
          </Flex>
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
              onClick={() => dispatch.project.duplicate()}
              icon={<CopyIcon path="" />}
            />
            <ActionButton
              label="Reset props"
              icon={<IoMdRefresh />}
              onClick={() => dispatch.project.resetProps(component.id)}
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
              onClick={() => dispatch.project.deleteComponent(component.id)}
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
                    isFullWidth
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
      <Modal isOpen={isModalSearchOpen} onClose={() => setModalSearchOpen(false)}>
        <ModalContent>
          <ModalHeader>Select component</ModalHeader>
          <ModalCloseButton />
          <ModalBody flexDirection='row'>
            {lodash.sortBy(Object.values(components), c => c.id).map(comp =>(
              <p>
              <Link onClick={() => {
                dispatch.project.select(comp.id);
                document.getElementById(comp.id)?.scrollIntoView();
                setModalSearchOpen(false)
              }}>{comp.id}/{comp.type}</Link>
              </p>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>

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

export default Inspector
