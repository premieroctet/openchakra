import React from 'react'
import { Flex, Box } from '@chakra-ui/core'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Editor from './components/editor/Editor'
import Inspector from './components/inspector/Inspector'
import Sidebar from './components/sidebar/Sidebar'
import Header from './components/Header'
import { Global } from '@emotion/core'
import { HotKeys } from 'react-hotkeys'
import { useSelector } from 'react-redux'
import useShortcuts, { keyMap } from './hooks/useShortcuts'
import { getShowLayout } from './core/selectors/app'

const App = () => {
  const showLayout = useSelector(getShowLayout)
  const { handlers } = useShortcuts()

  return (
    <HotKeys allowChanges handlers={handlers} keyMap={keyMap}>
      <Global
        styles={() => ({
          '*': {
            transition: showLayout ? 'none !important' : undefined,
          },
          html: { minWidth: '860px' },
        })}
      />

      <Header />
      <DndProvider backend={Backend}>
        <Flex minHeight="calc(100vh - 3rem)">
          <Sidebar />

          <Box bg="white" flex={1} zIndex={10} position="relative">
            <Editor />
          </Box>

          <Box
            maxH="calc(100vh - 3rem)"
            flex="0 0 15rem"
            roundedRight={10}
            bg="#f7fafc"
            overflowY="auto"
            overflowX="visible"
            borderLeft="1px solid #cad5de"
          >
            <Inspector />
          </Box>
        </Flex>
      </DndProvider>
    </HotKeys>
  )
}

export default App
