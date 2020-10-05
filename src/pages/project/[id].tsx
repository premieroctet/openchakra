import * as React from 'react'
import { PrismaClient } from '@prisma/client'
import { Box, Flex } from '@chakra-ui/core'
import { GetStaticProps, GetStaticPaths } from 'next'
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
import useDispatch from '~hooks/useDispatch'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prisma = new PrismaClient()
  const project = await prisma.project.findOne({
    include: { user: true },
    where: {
      id: Number(params!.id),
    },
  })
  let projects = JSON.parse(JSON.stringify(project))
  return {
    props: {
      projects,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient()
  const projects = await prisma.project.findMany()
  return {
    paths: projects.map(project => ({
      params: {
        id: project.id.toString(),
      },
    })),
    fallback: false,
  }
}

export default ({ projects }: any) => {
  const { handlers } = useShortcuts()
  const dispatch = useDispatch()
  dispatch.components.reset(JSON.parse(projects.markup))
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
          {/*@ts-ignore*/}
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
