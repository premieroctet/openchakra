import React, { useState, ChangeEvent, memo, useEffect } from 'react'
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  DarkMode,
  IconButton,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import { CloseIcon, EditIcon, SearchIcon } from '@chakra-ui/icons'
import DragItem from './DragItem'
import { menuItems, MenuItem } from '~componentsList'
import { useSelector } from 'react-redux'
import {
  getCustomComponents,
  getSelectedCustomComponentId,
} from '~core/selectors/customComponents'
import useDispatch from '~hooks/useDispatch'
import API from '~custom-components/api'
import { convertToPascal } from '~components/editor/Editor'
import { generateCode, generatePreview, generatePanel } from '~utils/code'

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const customComponents = useSelector(getCustomComponents)
  const selectedComponent = useSelector(getSelectedCustomComponentId)

  const getObjectDiff = (updatedList: Record<string, unknown>) => {
    let deletedComponents = Object.keys(customComponents).filter(
      component => !Object.keys(updatedList).includes(component),
    )
    let newComponents = Object.keys(updatedList).filter(
      component => !Object.keys(customComponents).includes(component),
    )
    return {
      deletedComponents: deletedComponents,
      newComponents: newComponents,
    }
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const newComponentsList = await API.get('/refresh').then(res => res.data)
      const componentDiffs = getObjectDiff(newComponentsList)
        componentDiffs.deletedComponents.map(async component => {
          const response = await API.post('/delete-file', {
            path: customComponents[component],
          })
        })
        componentDiffs.newComponents.map(async component => {
          const jsonResponse = await API.post('/read-json', {
            path: newComponentsList[component],
          })
          let components = JSON.parse(jsonResponse.data.content)
          let fileName = convertToPascal(newComponentsList[component])
          let previewCode = await generatePreview(components, fileName)
          let panelCode = await generatePanel(components, fileName)
          const response = await API.post('/init', {
            path: newComponentsList[component],
            previewBody: previewCode,
            panelBody: panelCode,
          })
        })
      dispatch.customComponents.updateCustomComponents(newComponentsList)
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [customComponents])

  const handleEditClick = async (name: string) => {
    const response = await API.post('/read-json', {
      path: customComponents[name],
    })
    dispatch.customComponents.select(name)
    dispatch.components.reset(JSON.parse(response.data.content))
  }

  return (
    <DarkMode>
      <Box
        maxH="calc(100vh - 3rem)"
        overflowY="auto"
        overflowX="visible"
        boxShadow="xl"
        flex="0 0 14rem"
        m={0}
        p={0}
        as="menu"
        backgroundColor="#2e3748"
        width="15rem"
      >
        <Box p={0} pb={0} position="sticky" w="100%" bgColor="#2e3748" top={0}>
          <InputGroup size="sm" mb={0}>
            <Input
              value={searchTerm}
              color="gray.300"
              placeholder="Search ..."
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(event.target.value)
              }
              borderColor="rgba(255, 255, 255, 0.04)"
              bg="rgba(255, 255, 255, 0.06)"
              _hover={{
                borderColor: 'rgba(255, 255, 255, 0.08)',
              }}
              zIndex={0}
            />
            <InputRightElement zIndex={1}>
              {searchTerm ? (
                <IconButton
                  color="gray.300"
                  aria-label="clear"
                  icon={<CloseIcon path="" />}
                  size="xs"
                  onClick={() => setSearchTerm('')}
                />
              ) : (
                <SearchIcon path="" color="gray.300" />
              )}
            </InputRightElement>
          </InputGroup>
        </Box>
        <Tabs size="sm" variant="enclosed-colored" isFitted defaultIndex={1}>
          <TabList
            position="sticky"
            top={8}
            boxShadow="dark-lg"
            bgColor="#2e3748"
            color="white"
          >
            <Tab>Built-in</Tab>
            <Tab>Custom</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box p={0} pt={0}>
                {(Object.keys(menuItems) as ComponentType[])
                  .filter(c =>
                    c.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map(name => {
                    const { children, soon } = menuItems[name] as MenuItem

                    if (children) {
                      const elements = Object.keys(children).map(childName => (
                        <DragItem
                          isChild
                          key={childName}
                          label={childName}
                          type={childName as any}
                          id={childName as any}
                          rootParentType={
                            menuItems[name]?.rootParentType || name
                          }
                        >
                          {childName}
                        </DragItem>
                      ))

                      return [
                        <DragItem
                          isMeta
                          soon={soon}
                          key={`${name}Meta`}
                          label={name}
                          type={`${name}Meta` as any}
                          id={`${name}Meta` as any}
                          rootParentType={
                            menuItems[name]?.rootParentType || name
                          }
                        >
                          {name}
                        </DragItem>,
                        ...elements,
                      ]
                    }

                    return (
                      <DragItem
                        soon={soon}
                        key={name}
                        label={name}
                        type={name as any}
                        id={name as any}
                        rootParentType={menuItems[name]?.rootParentType || name}
                      >
                        {name}
                      </DragItem>
                    )
                  })}
              </Box>
            </TabPanel>
            <TabPanel>
              <Box p={0} pt={0}>
                {(Object.keys(customComponents) as ComponentType[])
                  .filter(c =>
                    c.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map(name => {
                    return (
                      <Flex
                        alignItems={'center'}
                        justifyContent="space-between"
                        key={name}
                      >
                        <Box flex={1}>
                          <DragItem
                            key={name}
                            custom={true}
                            label={name}
                            type={name}
                            id={name}
                            rootParentType={name}
                            isSelected={name === selectedComponent}
                          >
                            {name}
                          </DragItem>
                        </Box>
                        <IconButton
                          aria-label="Edit"
                          size="sm"
                          onClick={() => {
                            handleEditClick(name)
                          }}
                          disabled={name === selectedComponent}
                        >
                          <EditIcon color="white" />
                        </IconButton>
                      </Flex>
                    )
                  })}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </DarkMode>
  )
}

export default memo(Menu)
