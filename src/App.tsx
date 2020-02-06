import React from 'react'
import {
  Flex,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/core'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Editor from './components/editor/Editor'
import Inspector from './components/inspector/Inspector'
import Sidebar from './components/sidebar/Sidebar'
import Header from './components/Header'
import { Global } from '@emotion/core'
import { HotKeys } from 'react-hotkeys'
import useShortcuts, { keyMap } from './hooks/useShortcuts'
import { getShowLayout } from './core/selectors/app'
import ErrorBoundary from './components/ErrorBoundary'
import ChildrenInspector from './components/inspector/ChildrenInspector'

const App = () => {
  const { handlers } = useShortcuts()

  return (
    <HotKeys allowChanges handlers={handlers} keyMap={keyMap}>
      <Global
        styles={() => ({
          html: { minWidth: '860px' },
        })}
      />

      <Header />
      <DndProvider backend={Backend}>
        <Flex h="calc(100vh - 3rem)">
          <Sidebar />

          <ErrorBoundary>
            <Box bg="white" flex={1} zIndex={10} position="relative">
              <Editor />
            </Box>
          </ErrorBoundary>

          <Box
            maxH="calc(100vh - 3rem)"
            flex="0 0 15rem"
            roundedRight={10}
            bg="#f7fafc"
            borderLeft="1px solid #cad5de"
          >
            <Tabs>
              <TabList>
                <Tab flex="1">Inspector</Tab>
                <Tab flex="1">Children</Tab>
              </TabList>
              <TabPanels overflowY="auto" overflowX="visible" h="100%">
                <TabPanel h="100%">
                  <Inspector />
                </TabPanel>
                <TabPanel h="100%">
                  <ChildrenInspector />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </DndProvider>
    </HotKeys>
  )
}

export default App
