import React, { useEffect, useState } from 'react'
import { Project } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { Global } from '@emotion/core'
import Metadata from '~components/Metadata'
import { DndProvider } from 'react-dnd'
import { Flex, Box, Spinner, Link } from '@chakra-ui/core'
import Backend from 'react-dnd-html5-backend'
import useDispatch from '~hooks/useDispatch'
import ComponentPreview from '~components/editor/ComponentPreview'
import { useSelector } from 'react-redux'
import { getComponents } from '~core/selectors/components'

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  let projectId = (params!.slug as string).split('-')[0]

  let bodyData = {
    projectId,
  }
  const baseUrl = req ? `https://${req.headers.host}` : ''

  const response = await fetch(baseUrl + '/api/project/searchById', {
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

const ProjectPreview = (props: ProjectContainer) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)
  const components = useSelector(getComponents)
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
    <>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />

      <Metadata />

      <DndProvider backend={Backend}>
        <Flex h="calc(100vh)">
          {error ? (
            loading ? (
              <Spinner m="0 auto" color="white" size="xl" mt="3rem" />
            ) : (
              <Box
                p={2}
                height="100%"
                minWidth="10rem"
                width="100%"
                display="block"
                justifyContent="center"
                alignItems="center"
                overflow="auto"
                position="relative"
                flexDirection="column"
              >
                {components.root.children.map((name: string) => (
                  <ComponentPreview key={name} componentName={name} />
                ))}
              </Box>
            )
          ) : (
            <Box color="white" m="0 auto">
              <Link href="/" color="teal.100">
                An error has occurred, click to return
              </Link>
            </Box>
          )}
        </Flex>
      </DndProvider>
    </>
  )
}

export default ProjectPreview
