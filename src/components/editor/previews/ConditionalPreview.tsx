import React from 'react'
import { Box } from '@chakra-ui/react'
import ComponentPreview from '~components/editor/ComponentPreview'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'

const ConditionalPreview: React.FC<IPreviewProps> = ({ component }) => {
  const acceptedTypes = ['Box'] as ComponentType[]
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box pos="relative" {...props} ref={drop(ref)}>
      {props.show === 'show-both' || props.show === undefined ? (
        <>
          <ComponentPreview componentName={component?.children[0]} />
          <ComponentPreview componentName={component?.children[1]} />
        </>
      ) : props.show === 'show-true' ? (
        <ComponentPreview componentName={component?.children[0]} />
      ) : (
        <ComponentPreview componentName={component?.children[1]} />
      )}
    </Box>
  )
}

export default ConditionalPreview
