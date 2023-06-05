import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'
import IconCheck from '~dependencies/custom-components/IconCheck'

const IconCheckPreview: React.FC<IPreviewProps> = ({ component }) => {

  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box pos="relative" ref={drop(ref)} {...props}>
      <IconCheck ref={drop(ref)} {...props} />
    </Box>
  )
}

export default IconCheckPreview