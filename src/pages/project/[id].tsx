import React, { useEffect } from 'react'
import { PrismaClient } from '@prisma/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import App from '~pages'
import { getSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
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
  })

  const checkUser = async (name: string) => {
    const response = await fetch('http://localhost:3000/api/project/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(name),
    })
    const data = await response.json()
    return data
  }

  const checkSession = async () => {
    const session = await getSession()
    if (session) {
      const userProject = await checkUser(session.user.name)
      console.log(userProject.project)
      userProject.project.map((e: any) => {
        if (e.id === id) {
          userCanEdit = true
        }
      })
      if (userCanEdit) {
        console.log(userCanEdit)
      } else {
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

  return <App projects={projects.markup} />
}
