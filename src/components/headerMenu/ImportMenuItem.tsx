import React from 'react'
import { MenuItem, Box } from '@chakra-ui/react'
import { FiUpload } from 'react-icons/fi'
import { loadFromJSON } from '~utils/import'
import useDispatch from '~hooks/useDispatch'

const ImportMenuItem = () => {
  const dispatch = useDispatch()

  return (
    <MenuItem
      onClick={async () => {
        const components = await loadFromJSON()
        dispatch.components.reset(components)
      }}
    >
      <Box mr={2} as={FiUpload} />
      Import components
    </MenuItem>
  )
}

export default ImportMenuItem
