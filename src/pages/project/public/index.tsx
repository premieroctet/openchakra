import React, { useState } from 'react'
import {
  Flex,
  Text,
  Box,
  SimpleGrid,
  PseudoBox,
  Avatar,
  RadioGroup,
  Radio,
} from '@chakra-ui/core'
import { Global } from '@emotion/core'
import { HotKeys } from 'react-hotkeys'
import Metadata from '../../../components/Metadata'
import useShortcuts, { keyMap } from '../../../hooks/useShortcuts'
import Header from '../../../components/Header'
import { useSession } from 'next-auth/client'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PrismaClient } from '@prisma/client'
import { useRouter } from 'next/router'
import PreviewProject from '~components/PreviewProject'
var app = require('node-server-screenshot')

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
  tag: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prisma = new PrismaClient()
  const project = await prisma.project.findMany({
    include: { user: true },
    where: {
      public: true,
      validated: true,
    },
  })
  let projects = JSON.parse(JSON.stringify(project))
  let projectCount = 0

  await new Promise((resolve, reject) => {
    projects.map(async (e: ProjectProps) => {
      const href = `http://localhost:3000/project/preview/${e.id}-${e.projectName}`
      await app.fromURL(href, `./public/thumbnails/${e.id}.jpg`, function() {
        projectCount++
        if (projectCount === projects.length) {
          resolve()
        }
      })
      setTimeout(() => {
        reject()
      }, 10000)
    })
  })

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
  const [radioValue, setRadioValue] = useState('all')

  return (
    <HotKeys allowChanges handlers={handlers} keyMap={keyMap}>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />

      <Metadata />

      <Header session={session} projectPage={true} />
      <Flex
        backgroundColor="#252d3d"
        p="2rem 5rem 2rem 5rem"
        minH="calc(100vh - 3rem)"
      >
        <Box w="100%">
          <Text
            m="0 auto"
            mt={5}
            fontSize="3xl"
            fontWeight={500}
            textAlign="left"
            color="white"
          >
            All projects
          </Text>

          <RadioGroup
            isInline
            spacing={4}
            defaultValue="1"
            color="white"
            variantColor="teal"
            onChange={e => setRadioValue(e.target.value)}
            value={radioValue}
            mt={5}
          >
            <Radio value="all">All</Radio>
            <Radio value="buttons">Buttons</Radio>
            <Radio value="form">Form</Radio>
            <Radio value="navigations">Navigations</Radio>
            <Radio value="cards">Cards</Radio>
            <Radio value="widget">Widget</Radio>
            <Radio value="tables">Tables</Radio>
            <Radio value="layouts">Layouts</Radio>
          </RadioGroup>

          {projects.length > 0 ? (
            <SimpleGrid columns={[2, 2, 2, 3]} spacing={6} mt={10}>
              {projects.map((e: ProjectProps, i: number) =>
                radioValue === 'all' ? (
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
                    <PreviewProject project={e} />

                    <Text fontSize="xl">{e.projectName}</Text>
                    <Text fontSize="md" mt={2} textAlign="right">
                      <Avatar
                        size="xs"
                        mr={2}
                        name={e.user.name || ''}
                        src={e.user.image || ''}
                      />
                      {e.user.name}
                    </Text>
                  </PseudoBox>
                ) : (
                  radioValue === e.tag && (
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
                      <PreviewProject project={e} />
                      <Text fontSize="xl">{e.projectName}</Text>
                      <Text fontSize="md" mt={2} textAlign="right">
                        <Avatar
                          size="xs"
                          mr={2}
                          name={e.user.name || ''}
                          src={e.user.image || ''}
                        />
                        {e.user.name}
                      </Text>
                    </PseudoBox>
                  )
                ),
              )}
              )
            </SimpleGrid>
          ) : (
            <Box textAlign="center" mt={30}>
              <Text color="white">There is no projects</Text>
            </Box>
          )}
        </Box>
      </Flex>
    </HotKeys>
  )
}

export default ProjectList
