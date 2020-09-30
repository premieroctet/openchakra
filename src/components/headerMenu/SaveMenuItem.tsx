import React from 'react'
import { useSelector } from 'react-redux'
import { MenuItem, Box } from '@chakra-ui/core'
import { FaSave } from 'react-icons/fa'
import { getComponents } from '~core/selectors/components'
import { signIn, useSession } from 'next-auth/client'

const SaveMenuItem = () => {
  const components = useSelector(getComponents)
  const [session, loading] = useSession()

  const saveProject = async () => {
    if (loading) {
      return <div>Loading...</div>
    }
    if (session) {
      console.log('user is connect, can save project')
      console.log(session)
      createProject()
    } else {
      signIn()
    }
  }

  const createProject = async () => {
    const markup = JSON.stringify(components)
    const response = await fetch('api/project/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        //@ts-ignore
        markup: markup,
        session,
      },
    })
    const data = await response.json()
    const { project } = data
    console.log(project)
    return project
  }

  return (
    <MenuItem onClick={() => saveProject()}>
      <Box mr={2} as={FaSave} />
      Save components
    </MenuItem>
  )
}

export default SaveMenuItem
