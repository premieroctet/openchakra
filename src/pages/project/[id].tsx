import React from 'react'
import { PrismaClient } from '@prisma/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import App from '~pages'
import { useSession, signIn } from 'next-auth/client'

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

export default async ({ projects }: any) => {
  const [session] = useSession()
  console.log(projects.markup)
  const checkUser = async (name: string) => {
    const response = await fetch('http://localhost:3000/api/project/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(name),
    })
    const data = await response.json()
    console.log(data)
  }

  if (session) {
    console.log(session.user.name)
    checkUser(session.user.name)
    // if (typeof window !== 'undefined') {
    //   router.push('/')
    //   return
    // }
  } else {
    signIn()
  }

  return <App projects={projects} />
}
