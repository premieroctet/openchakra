import React, { useEffect, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getSession, signIn } from 'next-auth/client'
import useDispatch from '~hooks/useDispatch'
import { useRouter } from 'next/router'
import EditorPage from '~pages/editor'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let projectId = (params!.slug as string).split('-')[0]
  let projectName = (params!.slug as string).split('-')[1]

  let bodyData = {
    projectId,
  }

  const response = await fetch(
    `${process.env.DEPLOY_URL}/api/project/searchById`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    },
  )
  const data = await response.json()
  let project = JSON.parse(JSON.stringify(data.project))

  return {
    props: {
      project,
      id: Number(projectId),
      projectName: projectName,
      publicValue: project?.public,
      validated: project?.validated,
    },
  }
}

const ProjectSlug = ({
  project,
  id,
  projectName,
  validated,
  publicValue,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [loading, setLoading] = useState(true)
  const [projectExist, setProjectExist] = useState(true)
  const router = useRouter()

  const dispatch = useDispatch()

  const checkSession = async () => {
    const session = await getSession()
    if (session) {
      if (project) {
        setProjectExist(true)
        if (project.markup) {
          dispatch.components.reset(JSON.parse(project.markup))
          setLoading(false)
        }
      } else {
        setProjectExist(false)
      }
    } else {
      signIn('github', {
        callbackUrl: process.env.NEXTAUTH_URL as string,
      })
    }
  }

  useEffect(() => {
    checkSession()
    // eslint-disable-next-line
  }, [])

  return router.isFallback ? (
    <div>Loading...</div>
  ) : (
    <EditorPage
      id={id}
      loading={loading}
      projectExist={projectExist}
      projectName={projectName}
      validated={validated}
      public={publicValue}
    />
  )
}

export default ProjectSlug
