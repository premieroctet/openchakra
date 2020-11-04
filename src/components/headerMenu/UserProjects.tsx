import React from 'react'
import { MenuItem, Box } from '@chakra-ui/core'
import { GoProject } from 'react-icons/go'

interface Props {
  onOpen: () => void
  showUserProjectList: () => void
}

const UserProjects = (props: Props) => {
  return (
    <MenuItem onClick={() => props.showUserProjectList()}>
      <Box mr={2} as={GoProject} />
      My projects
    </MenuItem>
  )
}

export default UserProjects
