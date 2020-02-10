import React, { useEffect } from 'react'
import { Flex, Box } from '@chakra-ui/core'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Editor from './components/editor/Editor'
import Inspector from './components/inspector/Inspector'
import Sidebar from './components/sidebar/Sidebar'
import Header from './components/Header'
import { Global } from '@emotion/core'
import { HotKeys } from 'react-hotkeys'
import useShortcuts, { keyMap } from './hooks/useShortcuts'
import EditorErrorBoundary from './components/errorBoundaries/EditorErrorBoundary'
import { decodeShareUrl } from './utils/share'
import useDispatch from './hooks/useDispatch'

const App = () => {
  const { handlers } = useShortcuts()
  const dispatch = useDispatch()

  // Init state from url if present
  useEffect(() => {
    const components = decodeShareUrl()
    if (components) {
      dispatch.components.reset(components)
      // eslint-disable-next-line
      history.replaceState(null, 'Openchakra', '/')
    }
  }, [dispatch.components])

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

          <EditorErrorBoundary>
            <Box bg="white" flex={1} zIndex={10} position="relative">
              <Editor />
            </Box>
          </EditorErrorBoundary>

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
