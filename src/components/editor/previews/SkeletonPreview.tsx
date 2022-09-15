import React from 'react'
import { useInteractive } from '~hooks/useInteractive'
import { Box, Skeleton } from '@chakra-ui/react'

const SkeletonPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props, ref } = useInteractive(component, true, true)

  return (
    <Box {...props} ref={ref}>
      <Skeleton {...component.props} styles={component.props} />
    </Box>
  )
}

export default SkeletonPreview
