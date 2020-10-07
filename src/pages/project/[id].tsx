import React, { useEffect } from 'react'
import { PrismaClient } from '@prisma/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import App from '~pages'
import { getSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import useDispatch from '~hooks/useDispatch'
import { checkUser } from '~utils/checkSession'

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

export default ({ projects, id }: any) => {
  const dispatch = useDispatch()
  const router = useRouter()
  let userCanEdit = false

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const checkSession = async () => {
    const session = await getSession()
    if (session) {
      const userProject = await checkUser(session.user.name)
      userProject.project.map((e: any) => {
        if (e.id === id) {
          userCanEdit = true
        }
      })
      if (userCanEdit === false) {
        if (typeof window !== 'undefined') {
          dispatch.components.reset()
          router.push('/')
          return
        }
      }
    } else {
      signIn()
    }
  }

  return projects.markup ? (
    <App projects={projects.markup} id={id} userCanEdit={userCanEdit} />
  ) : (
    <></>
  )
}
