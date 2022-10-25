import { Box, Text, ListItem } from '@chakra-ui/react'
import React from 'react'
import useDispatch from '~hooks/useDispatch'

const WarningItem = ({ warning }) => {
  const dispatch = useDispatch()

  const selectComponent = e => {
    e.preventDefault()
    if (warning.component.id) {
      dispatch.project.select(warning.component.id)
    }
  }

  return (
    //@ts-ignore
    <ListItem onClick={selectComponent} margin="5px">
      <Box fontSize="sm">
        <Text>
          {warning.component.type} {warning.component.id}
        </Text>
        <Text>{warning.message}</Text>
      </Box>
    </ListItem>
  )
}

export default WarningItem
