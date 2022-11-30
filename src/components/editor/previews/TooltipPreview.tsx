import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import ComponentPreview from '~components/editor/ComponentPreview'
import { Tooltip, Box } from '@chakra-ui/react'

interface Props {
  component: IComponent
}

const TooltipPreview = ({ component }: Props) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return component.children.length > 0 ? (
    <Tooltip ref={drop(ref)} {...props}>
      <span>
        <ComponentPreview componentName={component.children[0]} />
      </span>
    </Tooltip>
  ) : (
    <Box pos="relative" ref={drop(ref)} {...props}></Box>
  )
}

export default TooltipPreview
