import React from 'react'
import { Box } from '@chakra-ui/react'
import ComponentPreview from '~components/editor/ComponentPreview'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'

const ConditionalPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box pos="relative">
      {props.show === 'show-both' || props.show === undefined ? (
        <>
          <Box pos="relative" ref={drop(ref)} {...props}>
            <ComponentPreview componentName={component.children[0]} />
          </Box>
          <Box pos="relative" ref={drop(ref)} {...props}>
            <ComponentPreview componentName={component.children[1]} />
          </Box>
        </>
      ) : props.show === 'show-true' ? (
        <Box pos="relative" ref={drop(ref)} {...props}>
          <ComponentPreview componentName={component.children[0]} />
        </Box>
      ) : (
        <Box pos="relative" ref={drop(ref)} {...props}>
          <ComponentPreview componentName={component.children[1]} />
        </Box>
      )}
    </Box>
  )
}

export default ConditionalPreview