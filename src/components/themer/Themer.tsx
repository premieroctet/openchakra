import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  theme as baseTheme,
  Divider,
  Tooltip,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Tab,
  LightMode,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getNewTheme,
  getTheme,
  getThemePath,
} from '~core/selectors/customComponents'
import useDispatch from '~hooks/useDispatch'
import API from '~custom-components/api'
import ThemeCustomStyles from './CustomStyles'
import ThemeColorPalette from './ThemeColorPalette'
import ThemeLayers from './ThemeLayers'

const Themer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const themeState = useSelector(getTheme)
  const newThemeState = useSelector(getNewTheme)
  const themePath = useSelector(getThemePath)
  const dispatch = useDispatch()

  useEffect(() => {
    // TODO: baseStyle, parts, fonts, layer & text styles
    const updateThemeJson = async () => {
      if (themePath)
        await API.post('/save-theme', {
          themePath,
          themeState,
        })
    }
    dispatch.app.toggleLoader()
    updateThemeJson()
    dispatch.app.toggleLoader()
  }, [themeState, newThemeState])

  return (
    <LightMode>
      <Button
        px={6}
        bgGradient="linear(to-br, blue.300, green.300, yellow.300, red.300)"
        display="flex"
        flexDirection="row"
        alignItems="center"
        fontSize="sm"
        whiteSpace="nowrap"
        _hover={{
          bgGradient: 'linear(to-br, blue.200, green.200, yellow.200, red.200)',
        }}
        onClick={onOpen}
        color="black"
      >
        Theme
      </Button>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="xl">
        <DrawerOverlay />
        <DrawerContent
          className="themer"
          bgColor="white"
          style={{ color: 'black', colorScheme: 'teal' }}
        >
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Customize Project Theme
          </DrawerHeader>
          <DrawerBody>
            <Tabs
              variant="line"
              isLazy
              colorScheme="teal"
              orientation="vertical"
              className="theme"
            >
              <TabList>
                <Tab>
                  <Tooltip
                    label="Set default CSS properties"
                    fontSize="sm"
                    hasArrow
                    placement="right"
                  >
                    Color Palette
                  </Tooltip>
                </Tab>
                <Divider />
                <Tab>
                  <Tooltip
                    label="Add theme layers where the lower layer overrides the theme configuration set in above layers"
                    fontSize="sm"
                    hasArrow
                    placement="right"
                  >
                    Fonts
                  </Tooltip>
                </Tab>
                <Divider />
                <Tab>
                  <Tooltip
                    label="Create your own custom styles"
                    fontSize="sm"
                    hasArrow
                    placement="right"
                  >
                    Custom Styles
                  </Tooltip>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ThemeColorPalette themeState={newThemeState} />
                </TabPanel>
                <TabPanel>
                  {/* <ThemeLayers themeState={themeState} /> */}
                  <>TODO: Add fonts</>
                </TabPanel>
                <TabPanel>
                  <ThemeCustomStyles />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </LightMode>
  )
}

export default Themer
