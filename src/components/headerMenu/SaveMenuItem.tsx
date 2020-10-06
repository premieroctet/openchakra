import React from 'react'
import { useSelector } from 'react-redux'
import { MenuItem, Box } from '@chakra-ui/core'
import { FaSave } from 'react-icons/fa'
import { getComponents } from '~core/selectors/components'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const SaveMenuItem = () => {
  const components = useSelector(getComponents)
  const [session, loading] = useSession()
  const router = useRouter()

  const saveProject = async () => {
    if (loading) {
      return <div>Loading...</div>
    }
    if (session) {
      createProject()
      // if (typeof window !== 'undefined') {
      //   router.push('/')
      //   return
      // }
    } else {
      signIn()
    }
  }

  const createProject = async () => {
    const markup = JSON.stringify(components)
    let bodyData = {
      project: {
        markup: markup,
      },
    }
    const response = await fetch('http://localhost:3000/api/project/create', {
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

  return (
    <MenuItem onClick={() => saveProject()}>
      <Box mr={2} as={FaSave} />
      Save components
    </MenuItem>
  )
}

export default SaveMenuItem
