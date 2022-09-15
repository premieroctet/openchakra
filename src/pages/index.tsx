import React, { useState } from 'react'
import { Flex, Box, IconButton } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Global } from '@emotion/react'
import Metadata from '~components/Metadata'
import useShortcuts from '~hooks/useShortcuts'
import Header from '~components/Header'
import Sidebar from '~components/sidebar/Sidebar'
import EditorErrorBoundary from '~components/errorBoundaries/EditorErrorBoundary'
import Editor from '~components/editor/Editor'
import { InspectorProvider } from '~contexts/inspector-context'
import Inspector from '~components/inspector/Inspector'
import { HiOutlineDesktopComputer } from 'react-icons/hi'
import { MdOutlineTabletMac } from 'react-icons/md'
import { ImMobile } from 'react-icons/im'

const App = () => {
  const [editorWidth, setEditorWidth] = useState<string>('100%')
  useShortcuts()

  return (
    <>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />
      <Metadata />
      <Header />
      <DndProvider backend={HTML5Backend}>
        <Flex h="calc(100vh - 3rem)">
          <Sidebar />
          <EditorErrorBoundary>
            <Box bg="#edf2f6" flex={1} position="relative">
              <Flex
                w="100%"
                p={4}
                backgroundSize="20px 20px"
                bgColor="#edf2f6"
                align="center"
                justify="center"
                position="absolute"
                zIndex={10}
                boxShadow="lg"
              >
                <IconButton
                  icon={<HiOutlineDesktopComputer />}
                  size="lg"
                  fontSize="30px"
                  color={editorWidth === '100%' ? 'teal.500' : 'black.500'}
                  aria-label="Desktop version"
                  onClick={() => setEditorWidth('100%')}
                />

                <IconButton
                  icon={<MdOutlineTabletMac />}
                  size="lg"
                  color={editorWidth === '48em' ? 'teal.500' : 'black.500'}
                  fontSize="30px"
                  aria-label="Tablet version"
                  mx={12}
                  onClick={() => setEditorWidth('48em')}
                />

                <IconButton
                  icon={<ImMobile />}
                  size="lg"
                  color={editorWidth === '30em' ? 'teal.500' : 'black.500'}
                  fontSize="30px"
                  aria-label="Mobile version"
                  onClick={() => setEditorWidth('30em')}
                />
              </Flex>
              <Flex
                w={editorWidth}
                transition="all ease 0.5s"
                h="100%"
                align="center"
                justify="center"
                alignItems="stretch"
                pt={12}
                m="0 auto"
              >
                <Editor />
              </Flex>
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
    </>
  )
}

export default App
