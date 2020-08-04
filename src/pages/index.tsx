import React from 'react'
import { Flex, Box } from '@chakra-ui/core'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { Global } from '@emotion/core'
import { HotKeys } from 'react-hotkeys'
import Metadata from '~components/Metadata'
import useShortcuts, { keyMap } from '~hooks/useShortcuts'
import Header from '~components/Header'
import Sidebar from '~components/sidebar/Sidebar'
import EditorErrorBoundary from '~components/errorBoundaries/EditorErrorBoundary'
import Editor from '~components/editor/Editor'
import { InspectorProvider } from '~contexts/inspector-context'
import Inspector from '~components/inspector/Inspector'

const App = () => {
  const { handlers } = useShortcuts()

  return (
    <HotKeys allowChanges handlers={handlers} keyMap={keyMap}>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />

      <Metadata />

      <Header />
      <DndProvider backend={Backend}>
        <Flex h="calc(100vh - 3rem)">
          <Sidebar />
          <EditorErrorBoundary>
            <Box bg="white" flex={1} zIndex={10} position="relative">
              <Editor />
            </Box>
          </EditorErrorBoundary>

          <Box
            maxH="calc(100vh - 3rem)"
            flex="0 0 15rem"
            bg="#f7fafc"
            overflowY="auto"
            overflowX="visible"
            borderLeft="1px solid #cad5de"
          >
            <InspectorProvider>
              <Inspector />
            </InspectorProvider>
          </Box>
        </Flex>
      </DndProvider>
    </HotKeys>
  )
}

export default App
