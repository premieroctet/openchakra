import React from 'react'
import { useSelector } from 'react-redux'
import { MenuItem, Box, useToast } from '@chakra-ui/core'
import { FaSave } from 'react-icons/fa'
import { getComponents } from '~core/selectors/components'
import { signIn, useSession } from 'next-auth/client'
import { checkUser, createProject } from '~utils/checkProject'

interface Props {
  id: number
}

interface Project {
  createdAt: string
  updatedAt: string
  userId: number
  id: number
  markup: string
}

const SaveMenuItem = (props: Props) => {
  const components = useSelector(getComponents)
  const toast = useToast()
  const [session] = useSession()

  const updateProject = async () => {
    const markup = JSON.stringify(components)
    let bodyData = {
      project: {
        markup: markup,
        id: props.id,
      },
    }
    const response = await fetch('/api/project/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    })
    const data = await response.json()
    const { project } = data
    return project
  }

  const saveProject = async () => {
    if (session) {
      if (props.id) {
        let userCanEdit = false
        const userProject = await checkUser(session.user.name)
        userProject.project.map((e: Project) => {
          if (e.id === props.id) {
            userCanEdit = true
          }
          return
        })
        if (userCanEdit === false) {
          const markup = JSON.stringify(components)
          let newProject = await createProject(markup)
          toast({
            title: 'Forked project',
            description: 'The project has been forked successfully',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })

          window.location.href = `/project/${newProject.id}`
        }
        if (userCanEdit) {
          await updateProject()
          toast({
            title: 'Saved project',
            description: 'The project has been saved successfully',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      } else {
        const markup = JSON.stringify(components)
        let newProject = await createProject(markup)
        toast({
          title: 'Created project',
          description: 'The project has been created successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        window.location.href = `project/${newProject.id}`
      }
    } else {
      signIn()
    }
  }

  return (
    <MenuItem onClick={() => saveProject()}>
      <Box mr={2} as={FaSave} />
      Save components
    </MenuItem>
  )
}

export default SaveMenuItem
