import React from 'react'
import { Flex, Box, SimpleGrid, Grid, Stack } from '@chakra-ui/core'

const App = () => (
  <>
    <Box />
    <Flex align="center" justify="center" />
    <SimpleGrid columns={2} spacing={10} />
    <Grid templateColumns="repeat(5, 1fr)" gap={6} />
    <Stack spacing={8} />
  </>
)
