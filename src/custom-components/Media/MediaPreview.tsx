import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import { Box } from '@chakra-ui/react'
import { getExtension, mediaAccordingToExt } from '~utils/mediaAccordingToExt'

const MediaPreview: React.FC<IPreviewProps> = ({ component }) => {
  
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box pos="relative" ref={drop(ref)} {...props}>
      {props.src ? mediaAccordingToExt({ext: getExtension(props.src), src: props.src, ...props}) : <div>Source needed</div>}
    </Box>
  )
}

export default MediaPreview
