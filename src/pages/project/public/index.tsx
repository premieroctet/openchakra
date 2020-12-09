import React, { useState, useEffect } from 'react'
import {
  Flex,
  Text,
  Box,
  SimpleGrid,
  PseudoBox,
  Avatar,
  RadioGroup,
  Radio,
  Spinner,
} from '@chakra-ui/core'
import { Global } from '@emotion/core'
import { HotKeys } from 'react-hotkeys'
import Metadata from '../../../components/Metadata'
import useShortcuts, { keyMap } from '../../../hooks/useShortcuts'
import Header from '../../../components/Header'
import { useSession } from 'next-auth/client'
import { Project, User } from '@prisma/client'
import { useRouter } from 'next/router'
import PreviewProject from '~components/PreviewProject'

interface Projects {
  project: []
}

const ProjectList = () => {
  const [projects, setProjects] = useState<Projects | undefined>(undefined)
  const { handlers } = useShortcuts()
  const [session] = useSession()
  const router = useRouter()
  const [radioValue, setRadioValue] = useState('all')

  const fetchProject = async () => {
    const res = await fetch('/api/project/public')
    const project = await res.json()
    setProjects(project)
  }

  useEffect(() => {
    fetchProject()
  }, [])

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

          {projects ? (
            projects?.project.length > 0 ? (
              <SimpleGrid columns={[2, 2, 2, 3]} spacing={6} mt={10}>
                {projects?.project.map(
                  (e: Project & { user: User }, i: number) =>
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
            )
          ) : (
            <Box textAlign="center" mt={30}>
              <Spinner m="0 auto" color="white" size="xl" mt="3rem" />
            </Box>
          )}
        </Box>
      </Flex>
    </HotKeys>
  )
}

export default ProjectList
