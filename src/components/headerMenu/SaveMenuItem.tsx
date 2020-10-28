import React from 'react'
import { MenuItem, Box } from '@chakra-ui/core'
import { FaSave } from 'react-icons/fa'

interface Props {
  saveProject: () => void
}

const SaveMenuItem = (props: Props) => {
  return (
    <MenuItem onClick={() => props.saveProject()}>
      <Box mr={2} as={FaSave} />
      Save components
    </MenuItem>
  )
}

export default SaveMenuItem
