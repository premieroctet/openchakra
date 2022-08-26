import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'

const CardPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { drop, isOver } = useDropComponent(component.id, [])
  const { props, ref } = useInteractive(component, true)

  return (
    <Box pos="relative" ref={drop(ref)} id={component.id} {...props}>
      <h1>Data provider pour {props?.model}</h1>
    </Box>
  )
}

export default CardPreview
