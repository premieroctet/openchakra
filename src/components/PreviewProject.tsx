import React from 'react'
import { Box, Spinner } from '@chakra-ui/core'
//import Image from 'next/image'
import { Project } from '@prisma/client'

interface Props {
  project: Project
}

const PreviewProject = (props: Props) => {
  return (
    <Box mb={3} maxW="100%">
      {!props.project ? (
        <Spinner m="0 auto" color="white" size="xl" mt="3rem" />
      ) : (
        <img src={props.project.thumbnail} alt={props.project.projectName} />
      )}
    </Box>
  )
}

export default PreviewProject
