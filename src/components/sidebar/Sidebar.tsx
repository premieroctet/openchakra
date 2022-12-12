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
  ButtonGroup,
  Button,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Link,
  list
} from '@chakra-ui/react'
import { CloseIcon, EditIcon, SearchIcon } from '@chakra-ui/icons'
import DragItem from './DragItem'
import { menuItems, MenuItem } from '~componentsList'
import { useSelector } from 'react-redux'
import {
  getCustomComponents,
  getInstalledComponents,
  getSelectedCustomComponentId,
} from '~core/selectors/customComponents'
import useDispatch from '~hooks/useDispatch'
import API from '~custom-components/api'
import AddComponent from './AddComponent'
import DeleteComponent from './DeleteComponent'
import InstallComponent from './InstallComponent'
import InstalledPropTable from './InstalledPropTable'
import ComponentPreview from '~components/editor/ComponentPreview'


const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const customComponents = useSelector(getCustomComponents)
  const installedComponents = useSelector(getInstalledComponents)
  const selectedComponent = useSelector(getSelectedCustomComponentId)

  const handleEditClick = async (name: string) => {
    const response = await API.post('/read-json', {
      path: customComponents[name],
    })
    dispatch.customComponents.select(name)
    dispatch.components.reset(JSON.parse(response.data.content))
  }

  const autoselectComponent = () => {
    if (
      (selectedComponent === undefined &&
        Object.keys(customComponents).length) ||
      !Object.keys(customComponents).includes(String(selectedComponent))
    )
      handleEditClick(Object.keys(customComponents)[0])
    else if (!Object.keys(customComponents).length)
      dispatch.customComponents.unselect()
  }

  useEffect(() => {
    const initFunction = async () => {
      const { newComponentsList, themeJsonPath, installedList } = await API.post('/init').then(
        (res: any) => res.data,
      )
      dispatch.customComponents.updateCustomComponents(newComponentsList)
      dispatch.customComponents.setThemePath(themeJsonPath)
      dispatch.customComponents.initInstalledComponents(installedList)
    }
    dispatch.app.toggleLoader()
    initFunction()
    dispatch.app.toggleLoader()
  }, [])

  useEffect(() => {
    dispatch.app.toggleLoader()
    autoselectComponent()
    dispatch.app.toggleLoader()
  }, [customComponents])

  const getParameters = async (name: string, pathPackage: string) => {
    const res = await API.post('/get-parameters', {
      component: name,
      path: pathPackage
    })
    setParam(JSON.stringify(res.data));
  }

  const [param, setParam] = useState(String);

  const [isShown, setIsShown] = useState(false);
  const handleClick = () => {
    setIsShown(current => !current);
  };


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
                <ButtonGroup
                  size="sm"
                  isAttached
                  variant="outline"
                  colorScheme="teal"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AddComponent />
                  <InstallComponent />
                </ButtonGroup>

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
                        <ButtonGroup
                          size="xs"
                          isAttached
                          variant="outline"
                          colorScheme="teal"
                        >
                          <IconButton
                            aria-label="Edit"
                            onClick={() => {
                              handleEditClick(name)
                            }}
                            disabled={name === selectedComponent}
                          >
                            <EditIcon color="gray.300" />
                          </IconButton>
                          <DeleteComponent name={name} />
                        </ButtonGroup>
                      </Flex>
                    )
                  })}
                {Object.keys(installedComponents)
                  .filter(c =>
                    c.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map(componentPath => {
                    const name = componentPath.split('.').slice(-1)[0];
                    return (
                      <Flex
                        alignItems={'center'}
                        justifyContent="space-between"
                        key={name}
                      >
                        <Box flex={1}>
                          <DragItem
                            isInstalled
                            key={name}
                            custom={true}
                            label={name}
                            type={name}
                            id={name}
                            rootParentType={name}
                            isSelected={false}
                          >
                            {name}
                          </DragItem>
                        </Box>
                        <ButtonGroup
                          size="xs"
                          isAttached
                          variant="outline"
                          colorScheme="teal"
                        >
                          <Popover>
                            <PopoverTrigger>
                              <Button
                                onClick={() => {
                                  handleClick()
                                  getParameters(name, installedComponents[name]);
                                }}>
                                +
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent color="whiteAlpha.900" backgroundColor="#703A8D" fontSize="sm">
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverHeader>
                                {name}
                              </PopoverHeader>
                              <PopoverBody>
                                {/* {param} */}
                                {/* <InstalledPropTable param={param}/> */}
                                {/* <ComponentPreview key={name} componentName={name} /> */}
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                          {isShown && (
                            <div>

                            </div>
                          )}
                          <DeleteComponent name={name} isInstalled />
                        </ButtonGroup>
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
