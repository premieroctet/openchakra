import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import { Box } from '@chakra-ui/react'

const CardPreview: React.FC<IPreviewProps> = ({ component }) => {
  const acceptedTypes = [
    'AlertTitle',
    'AlertIcon',
    'AlertDescription',
    'DataProvider',
  ] as ComponentType[]
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box pos="relative" ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
    </Box>
  )
}

export default CardPreview
