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
import {
  cmenuItems,
  CMenuItem,
} from '../../custom-components/customComponentsList'
import { useSelector } from 'react-redux'
import { getCustomComponents } from '~core/selectors/customComponents'
import useDispatch from '~hooks/useDispatch'
import API from '~custom-components/api'

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const currentComponents = useSelector(getCustomComponents)

  const getObjectDiff = (updatedList: Record<string, unknown>) => {
    let deletedComponents = Object.keys(currentComponents).filter(
      component => !Object.keys(updatedList).includes(component),
    )
    let newComponents = Object.keys(updatedList).filter(
      component => !Object.keys(currentComponents).includes(component),
    )
    return {
      deletedComponents: deletedComponents,
      newComponents: newComponents,
    }
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const newComponentsList = await API.get('/refresh').then(res => res.data)
      dispatch.customComponents.updateCustomComponents(newComponentsList)
      const componentDiffs = getObjectDiff(newComponentsList)
      if (componentDiffs.deletedComponents.length) {
        componentDiffs.deletedComponents.map(async component => {
          const response = await API.post('/delete-file', {
            path: currentComponents[component],
          })
        })
      }
      if (componentDiffs.newComponents.length) {
        componentDiffs.deletedComponents.map(async component => {
          const response = await API.post('/init', {
            path: newComponentsList[component],
          })
        })
      }
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [currentComponents])

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
          <TabList>
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
                {(Object.keys(cmenuItems) as ComponentType[])
                  .filter(c =>
                    c.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map(name => {
                    const { custom } = cmenuItems[name] as CMenuItem
                    return (
                      <Flex
                        alignItems={'center'}
                        justifyContent="space-between"
                        key={name}
                      >
                        <Box flex={1}>
                          <DragItem
                            key={name}
                            custom={!!custom}
                            label={name}
                            type={name}
                            id={name}
                            rootParentType={name}
                          >
                            {name}
                          </DragItem>
                        </Box>
                        <IconButton aria-label="Edit" size="sm">
                          <EditIcon
                            color="white"
                            onClick={() => {
                              console.log(
                                'Disable this component and load json in editor.',
                              )
                            }}
                          />
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
