import * as React from 'react'
import { PrismaClient } from '@prisma/client'
import { Box, Text } from '@chakra-ui/core'
import { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prisma = new PrismaClient()
  const project = await prisma.project.findMany({
    include: { user: true },
    where: {
      id: Number(params!.id),
    },
  })
  console.log(project)
  return {
    props: {
      project,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prisma = new PrismaClient()
  const projects = await prisma.project.findMany()
  console.log(projects)
  return {
    paths: projects.map(project => ({
      params: {
        id: project.id.toString(),
      },
    })),
    fallback: false,
  }
}

export default ({ project }: any) => {
  console.log(project)
  return (
    <Box mt={8}>
      <Text color="grey.700" mb={4}></Text>
    </Box>
  )
}
