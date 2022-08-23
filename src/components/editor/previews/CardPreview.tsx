import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
// import ComponentPreview from '~components/editor/ComponentPreview'
import { Box } from '@chakra-ui/react'

interface Props {
  component: IComponent
}

const CardPreview: React.FC<{ component: IComponent }> = ({ component }) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return <Box pos="relative" ref={drop(ref)} {...props} />
}

export default CardPreview
