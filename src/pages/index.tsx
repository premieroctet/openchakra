import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Global } from '@emotion/react'
import Metadata from '~components/Metadata'
import useShortcuts from '~hooks/useShortcuts'
import Header from '~components/Header'
import Loader from '~components/Loader'
import Sidebar from '~components/sidebar/Sidebar'
import EditorErrorBoundary from '~components/errorBoundaries/EditorErrorBoundary'
import Editor from '~components/editor/Editor'
import { InspectorProvider } from '~contexts/inspector-context'
import Inspector from '~components/inspector/Inspector'

const App = () => {
  useShortcuts()
  return (
    <>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />
      <Loader />
      <Metadata />
      <Header />
      <DndProvider backend={HTML5Backend}>
        <Flex h="calc(100vh - 3rem)">
          <Sidebar />
          <EditorErrorBoundary>
            <Box bg="white" flex={1} position="relative" width="100px">
              <Editor />
            </Box>
          </EditorErrorBoundary>
          <style>
            {
              '\
              .inspector select, .inspector input, .themer select, .themer input, .themer hr, .themer .chakra-tabs__tablist, .themer .chakra-modal__header, .themer chakra-tabs__tab-panels, .themer .chakra-accordion__item, .chakra-popover__popper{\
                border-color:var(--chakra-colors-gray-200) !important;\
              }\
              .inspector, .header, .sidebar, .themer, .customPropsMenu, .paramSelector, .paramsMenu, .chakra-popover__popper {\
                font-family:sans-serif !important;\
              }\
              .editor {\
                background-color:var(--chakra-colors-chakra-body-bg) !important;\
              }\
              .chakra-slider__thumb {\
                color:var(--chakra-colors-black) !important;\
              }\
              '
            }
          </style>
          <Box
            maxH="calc(100vh - 3rem)"
            flex="0 0 15rem"
            bg="#f7fafc"
            overflowY="auto"
            overflowX="visible"
            borderLeft="1px solid #cad5de"
            className="inspector"
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
