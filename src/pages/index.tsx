import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { Global } from '@emotion/react'
import Metadata from '~components/Metadata'
import useShortcuts from '~hooks/useShortcuts'
import Header from '~components/Header'
import Sidebar from '~components/sidebar/Sidebar'
import EditorErrorBoundary from '~components/errorBoundaries/EditorErrorBoundary'
import Editor from '~components/editor/Editor'
import { InspectorProvider } from '~contexts/inspector-context'
import Inspector from '~components/inspector/Inspector'
import '~custom-components/Card/CardInit'
import '~custom-components/DataProvider/DataProviderInit'
import Menu from '~components/sidebar/Menu'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const App = () => {
  useShortcuts()

  return (
    <>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />
      <Metadata />
      {/* <Header /> */}
      <DndProvider backend={Backend}>
        <Flex h="100vh">
          <Menu />
          {/* <Sidebar /> */}
          <EditorErrorBoundary>
            <Box bg="white" flex={1} position="relative" overflow={'hidden'}>
              <Editor />
            </Box>
          </EditorErrorBoundary>

          <Box
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
    </>
  )
}

export default App
