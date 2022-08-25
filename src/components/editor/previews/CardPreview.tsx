import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import { Box } from '@chakra-ui/react'
import Card from '../../Card'

const CardPreview: React.FC<IPreviewProps> = ({ component }) => {
  const acceptedTypes = [
    'AlertTitle',
    'AlertIcon',
    'AlertDescription',
  ] as ComponentType[]
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes)
  const { props, ref } = useInteractive(component, true)

  console.log(component)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box pos="relative" ref={drop(ref)} {...props}>
      {component.children.map((key: string) => (
        <ComponentPreview key={key} componentName={key} />
      ))}
      <Card />
    </Box>
  )
}

export default CardPreview
