import React from 'react'
import { Grid, Center, Avatar, Text, Button } from '@chakra-ui/react'

const Card = () => (
  <Grid gap={6} maxWidth={300} backgroundColor="whatsapp.100">
    <Center>
      <Avatar />
    </Center>
    <Text textAlign="center" fontSize="lg">
      Text value
    </Text>
    <Text>Text value</Text>
    <Text>Text value</Text>
    <Button variant="solid" size="md">
      Button text
    </Button>
  </Grid>
)

export default Card
