import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Global } from '@emotion/react'
import { useSelector } from 'react-redux'
import Metadata from '~dependencies/Metadata'
import useShortcuts from '~hooks/useShortcuts'
import EditorErrorBoundary from '~components/errorBoundaries/EditorErrorBoundary'
import Editor from '~components/editor/Editor'
import { InspectorProvider } from '~contexts/inspector-context'
import Inspector from '~components/inspector/Inspector'
import Warnings from '~components/warnings/Warnings'
import '~custom-components/Card/CardInit'
import '~custom-components/Date/DateInit'
import '~custom-components/UploadFile/UploadFileInit'
import '~custom-components/Rating/RatingInit'
import '~custom-components/Media/MediaInit'
import '~custom-components/Timer/TimerInit'
import '~custom-components/NumberFormat/NumberFormatInit'
import '~custom-components/DataProvider/DataProviderInit'
import Menu from '~components/sidebar/Menu'
import MediasContainer from '~components/MediasContainer'
import { getMediasLayout } from '../core/selectors/app'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const App = () => {
  useShortcuts()

  const mediasLayout = useSelector(getMediasLayout)

  return (
    <>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />
      <Metadata />
      <DndProvider backend={HTML5Backend}>
        <Flex h="100vh">
          <Menu />
          {/* <Sidebar /> */}
          <EditorErrorBoundary>
            <Box bg="white" flex={1} position="relative" overflow={'hidden'}>
              {mediasLayout ? <MediasContainer /> : <Editor />}
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
          <Box
            bg="#f7fafc"
            overflowY="auto"
            overflowX="visible"
            borderLeft="1px solid #cad5de"
          >
            {false && <Warnings />}
          </Box>
        </Flex>
      </DndProvider>
    </>
  )
}

export default App
