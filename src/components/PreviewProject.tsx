import React from 'react'
import { Box, Spinner } from '@chakra-ui/core'
import Image from 'next/image'
import { Project } from '@prisma/client'

interface Props {
  project: Project
}

const PreviewProject = (props: Props) => {
  return (
    <Box mb={3}>
      {!props.project ? (
        <Spinner m="0 auto" color="white" size="xl" mt="3rem" />
      ) : (
        <>
          <Image
            src={`/thumbnails/${props.project.id}.jpg`}
            alt={props.project.projectName}
            width={300}
            height={180}
            sizes="(max-height: 350px) 500px"
          />
        </>
      )}
    </Box>
  )
}

export default PreviewProject
