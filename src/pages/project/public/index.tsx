import React from 'react'
import { Flex, Text, Box, SimpleGrid, PseudoBox, Avatar } from '@chakra-ui/core'
import { Global } from '@emotion/core'
import { HotKeys } from 'react-hotkeys'
import Metadata from '../../../components/Metadata'
import useShortcuts, { keyMap } from '../../../hooks/useShortcuts'
import Header from '../../../components/Header'
import { useSession } from 'next-auth/client'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PrismaClient } from '@prisma/client'
import { useRouter } from 'next/router'

interface User {
  id: number
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  createdAt: Date
  updatedAt: Date
}

interface ProjectProps {
  id: number
  createdAt: Date
  updatedAt: Date
  markup: JSON
  userId: number
  projectName: string
  public: boolean
  validated: boolean
  user: User
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prisma = new PrismaClient()
  const project = await prisma.project.findMany({
    include: { user: true },
    where: {
      public: true,
    },
  })
  let projects = JSON.parse(JSON.stringify(project))
  return {
    props: {
      projects,
    },
  }
}

const ProjectList = ({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { handlers } = useShortcuts()
  const [session] = useSession()
  const router = useRouter()
  return (
    <HotKeys allowChanges handlers={handlers} keyMap={keyMap}>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />

      <Metadata />

      <Header session={session} projectPage={true} />

      <Flex h="calc(100vh - 3rem)" backgroundColor="#252d3d" p={5}>
        <Box w="100%">
          <Text
            m="0 auto"
            mt={5}
            fontSize="2xl"
            textAlign="center"
            color="white"
          >
            Public project
          </Text>

          <SimpleGrid columns={3} spacing={10} mt={10}>
            {projects.length > 0 ? (
              projects.map((e: ProjectProps, i: number) => (
                <PseudoBox
                  bg="#1A202C"
                  color="white"
                  p="1rem"
                  cursor="pointer"
                  _hover={{ backgroundColor: '#2d384b' }}
                  onClick={() => {
                    const href = `/project/public/${e.id}-${e.projectName}`
                    router.push(href, href, { shallow: true })
                  }}
                  key={i}
                >
                  <Text fontSize="xl">{e.projectName}</Text>
                  <Text fontSize="md" mt={2} textAlign="right">
                    <Avatar
                      size="xs"
                      mr={2}
                      name={e.user.name || ''}
                      src={e.user.image || ''}
                    />
                    By {e.user.name}
                  </Text>
                </PseudoBox>
              ))
            ) : (
              <Text>There is no projets</Text>
            )}
          </SimpleGrid>
        </Box>
      </Flex>
    </HotKeys>
  )
}

export default ProjectList
