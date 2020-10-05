import * as React from 'react'
import { PrismaClient } from '@prisma/client'
import { Box, Text } from '@chakra-ui/core'
import { GetStaticProps, GetStaticPaths } from 'next'

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
  console.log(projects)
  return (
    <Box mt={8}>
      <Text color="grey.700" mb={4}></Text>
    </Box>
  )
}
