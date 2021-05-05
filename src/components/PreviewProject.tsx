import React from 'react'
import { Box, Spinner, Icon, Text, Avatar } from '@chakra-ui/core'
import { Project, User } from '@prisma/client'

interface Props {
  project: Project & { user: User }
}

const PreviewProject = (props: Props) => {
  return (
    <Box mb={3} maxW="100%">
      {!props.project ? (
        <Spinner m="0 auto" color="white" size="xl" mt="3rem" />
      ) : props.project.thumbnail ? (
        <img
          src={props.project.thumbnail}
          alt={props.project.projectName}
          style={{ height: '200px', width: '100%' }}
        />
      ) : (
        <Box textAlign="center" margin={0} h="200px" w="100%">
          <Icon name="warning" size="32px" color="red.500" mt={20} />
          <Text mt={3}>No screenshot for this project</Text>
        </Box>
      )}

      <Box w="100%">
        <Text fontSize="xl">{props.project.projectName}</Text>
        <Text fontSize="md" mt={2} textAlign="right" w="100%">
          <Avatar
            size="xs"
            mr={2}
            name={props.project.user.name || ''}
            src={props.project.user.image || ''}
          />
          {props.project.user.name}
        </Text>
      </Box>
    </Box>
  )
}

export default PreviewProject
