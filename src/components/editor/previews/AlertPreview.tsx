import React from 'react'
import { useInteractive } from '../../../hooks/useInteractive'
import { useDropComponent } from '../../../hooks/useDropComponent'
import { useHoverComponent } from '../../../hooks/useHoverComponent'
import ComponentPreview from '../ComponentPreview'
import { Alert, Box } from '@chakra-ui/core'

const AlertPreview: React.FC<IPreviewProps> = ({ component }) => {
  const acceptedTypes = [
    'AlertIcon',
    'AlertTitle',
    'AlertDescription',
  ] as ComponentType[]
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes)
  const { props, ref, boundingPosition } = useInteractive(
    component,
    false,
    drop,
  )
  const { hover } = useHoverComponent(
    component.id,
    boundingPosition && {
      top: boundingPosition.top,
      bottom: boundingPosition.bottom,
    },
  )
  let boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box ref={hover(ref)} {...boxProps}>
      <Alert {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Alert>
    </Box>
  )
}

export default AlertPreview
