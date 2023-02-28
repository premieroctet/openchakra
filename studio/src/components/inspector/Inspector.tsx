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
import React, { useState, memo, useEffect, useMemo, useRef } from 'react'
import lodash from 'lodash'
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
  getActivePage,
  getComponentWarnings,
  getPages,
} from '../../core/selectors/components';
import {
  getModels,
} from '../../core/selectors/dataSources';
import ActionButton from './ActionButton'

const ComponentLink = ({componentid, children, closeFn}) => {
  const dispatch = useDispatch()

  return (
    <Link onClick={() => {
      dispatch.project.select(componentid)
      document.getElementById(componentid)?.scrollIntoView()
      closeFn()
    }}>{children}</Link>
  )
}

const TreeRenderer = ({componentid, components, level, closeFn, filter}) => {
  componentid = componentid || 'root'
  level = level || 0
  const node=components[componentid]
  if (node) {
    const title=`${node.type}/${node.id}`
    const re=new RegExp(filter || '', 'i')
    return (
      <Box ml={level}>
        {re?.test(title) && <ComponentLink componentid={componentid} closeFn={closeFn}>{title}</ComponentLink>}
        <>
        {node.children.map(c =>
          <TreeRenderer componentid={c} components={components} level={level+1} closeFn={closeFn} filter={filter}/>
        )}
        </>
      </Box>
    )
  }
  return null
}

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
  const activePage = useSelector(getActivePage)

  const [isModalSearchOpen, setModalSearchOpen] = useState(false)
  const [treeFilter, setTreeFilter] = useState(null)
  const initialRef = useRef(null)

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

  const onTreeFilterChange = ev => {
    const value=ev.target.value
    setTreeFilter(value || null)
  }

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
          <Flex justifyContent="space-between" flexDirection='column'>
          <p>{activePage?.pageName}</p>
          <Flex justifyContent="space-between" flexDirection='row'>
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
      <Modal onClose={onClose} isOpen={isOpen} isCentered >
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
      {isModalSearchOpen &&
      <Modal isOpen={isModalSearchOpen} onClose={() => {setModalSearchOpen(false);setTreeFilter(null)}} initialFocusRef={initialRef} >
        <ModalContent maxW="50%">
          <ModalHeader>Select component</ModalHeader>
          <ModalCloseButton />
          <ModalBody flexDirection='row'>
            <Input onChange={onTreeFilterChange} ref={initialRef}/>
            <TreeRenderer components={components} closeFn={()=>setModalSearchOpen(false)} filter={treeFilter}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    }
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
