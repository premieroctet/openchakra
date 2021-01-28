import React, { useEffect, useState } from 'react'
import { Project } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'
import useShortcuts, { keyMap } from '~hooks/useShortcuts'
import { HotKeys } from 'react-hotkeys'
import { Global } from '@emotion/core'
import Metadata from '~components/Metadata'
import Header from '~components/Header'
import { DndProvider } from 'react-dnd'
import { Flex, Box, Spinner, Link } from '@chakra-ui/core'
import EditorErrorBoundary from '~components/errorBoundaries/EditorErrorBoundary'
import Editor from '~components/editor/Editor'
import Backend from 'react-dnd-html5-backend'
import useDispatch from '~hooks/useDispatch'

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  let projectId = (params!.slug as string).split('-')[0]
  let bodyData = {
    projectId,
  }
  const baseUrl = req ? `https://${req.headers.host}` : ''
  const response = await fetch(baseUrl + '/api/project/searchPublic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  })
  const data = await response.json()
  let project = JSON.parse(JSON.stringify(data.project))

  return {
    props: {
      project,
    },
  }
}

interface ProjectContainer {
  project: Project
}

const ProjectPublic = (props: ProjectContainer) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)

  const { handlers } = useShortcuts()
  const [session] = useSession()
  const dispatch = useDispatch()

  const initProject = async () => {
    setLoading(true)
    if (props.project) {
      if (props.project.markup) {
        setError(true)
        await dispatch.components.reset(
          JSON.parse(props.project.markup as string),
        )
        setLoading(false)
      } else {
        setError(false)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    initProject()
    // eslint-disable-next-line
  }, [])

  return (
    <HotKeys allowChanges handlers={handlers} keyMap={keyMap}>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />

      <Metadata />

      <Header session={session} projectPage={true} />

      <DndProvider backend={Backend}>
        <Flex h="calc(100vh - 3rem)">
          {error ? (
            loading ? (
              <Spinner m="0 auto" color="white" size="xl" mt="3rem" />
            ) : (
              /* @ts-ignore */
              <EditorErrorBoundary>
                <Box bg="white" flex={1} zIndex={10} position="relative">
                  <Editor />
                </Box>
              </EditorErrorBoundary>
            )
          ) : (
            <Box color="white" m="0 auto" mt={20}>
              <Link href="/project/public" color="teal.100">
                This project is not public, click to return
              </Link>
            </Box>
          )}
        </Flex>
      </DndProvider>
    </HotKeys>
  )
}

export default ProjectPublic
