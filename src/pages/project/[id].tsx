import React, { useEffect } from 'react'
import { PrismaClient } from '@prisma/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getSession, signIn } from 'next-auth/client'
import useDispatch from '~hooks/useDispatch'
import { checkUser } from '~utils/checkProject'
import App from '~pages'

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
      id: Number(params!.id),
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
  const dispatch = useDispatch()
  let userCanEdit = false

  const checkSession = async () => {
    const session = await getSession()
    if (session) {
      const userProject = await checkUser(session.user.name)
      userProject.project.map((e: Project) => {
        if (e.id === id) {
          userCanEdit = true
        }
      })
      if (userCanEdit === false) {
        if (typeof window !== 'undefined') {
          dispatch.components.reset()
          window.location.href = `/`
        }
      }
    } else {
      signIn()
    }
    if (projects.markup) {
      dispatch.components.reset(JSON.parse(projects.markup))
    }
  }

  useEffect(() => {
    checkSession()
  }, [checkSession])

  return projects.markup ? <App id={id} /> : <></>
}
