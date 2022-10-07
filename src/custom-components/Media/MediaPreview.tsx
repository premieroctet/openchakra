import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'
import { mediaWrapper } from './mediaWrapper'

const MediaPreview: React.FC<IPreviewProps> = ({ component }) => {
  
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box pos="relative" ref={drop(ref)} {...props}>
      {props.src ? mediaWrapper({src: props.src, ...props}) : <div>Source needed</div>}
    </Box>
  )
}

export default MediaPreview
