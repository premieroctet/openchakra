import React from 'react'
import { useSelector } from 'react-redux'
import { MenuItem, Box } from '@chakra-ui/react'
import { FaSave } from 'react-icons/fa'
import { saveAsJSON } from '~utils/import'
import { getFullComponents } from '~core/selectors/components'

const ExportMenuItem = () => {
  const components = useSelector(getFullComponents)

  return (
    <MenuItem onClick={() => saveAsJSON(components)}>
      <Box mr={2} as={FaSave} />
      Save components
    </MenuItem>
  )
}

export default ExportMenuItem
