import React, { useEffect, useState } from 'react'
import { PrismaClient } from '@prisma/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getSession, signIn } from 'next-auth/client'
import useDispatch from '~hooks/useDispatch'
import App from '~pages'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prisma = new PrismaClient()
  let projectId = (params!.slug as string).split('-')[0]
  let projectName = (params!.slug as string).split('-')[1]

  const project = await prisma.project.findOne({
    include: { user: true },
    where: {
      id: Number(projectId),
    },
  })
  let projects = JSON.parse(JSON.stringify(project))
  return {
    props: {
      projects,
      id: Number(projectId),
      projectName: projectName,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient()
  const projects = await prisma.project.findMany()
  return {
    paths: projects.map(project => ({
      params: {
        slug: `${project.id.toString()}-${project.projectName.toString()}`,
      },
    })),
    fallback: true,
  }
}

interface Project {
  createdAt: string
  updatedAt: string
  userId: number
  id: number
  markup: string
}

interface Props {
  projects: Project
  id: number
}

export default ({ projects, id }: Props) => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const checkSession = async () => {
    const session = await getSession()
    if (session) {
      if (projects.markup) {
        dispatch.components.reset(JSON.parse(projects.markup))
        setLoading(false)
      }
    } else {
      signIn()
    }
  }

  useEffect(() => {
    checkSession()
    // eslint-disable-next-line
  }, [])

  return projects.markup ? <App id={id} loading={loading} /> : <></>
}
