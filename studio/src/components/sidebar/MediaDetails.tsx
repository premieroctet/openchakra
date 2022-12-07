import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
const MediaDetails = () => {
  return (
    <Box
      bg="rgb(236, 236, 236)"
      w={'100%'}
      h={'100%'}
      p={2}
      display="flex"
      flexDirection={'column'}
    >
      <Text color={'black'} mb="2">
        Please, connect to your database
      </Text>
      <Button colorScheme={'teal'}>Plug your database</Button>
    </Box>
  )
}

export default MediaDetails
