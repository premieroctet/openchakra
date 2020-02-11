import React from 'react'
import { Popover, PopoverTrigger, Box } from '@chakra-ui/core'
import { useInteractive } from '../../../hooks/useInteractive'
import { useDropComponent } from '../../../hooks/useDropComponent'
import ComponentPreview from '../ComponentPreview'

const PopoverTriggerPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
  const { props, ref } = useInteractive(component)
  const { drop, isOver } = useDropComponent(component.id)
  const children = component.children

  const boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Popover {...boxProps} ref={drop(ref)}>
      <PopoverTrigger {...props}>
        {!children.length ? (
          <Box />
        ) : (
          <Box>
            <ComponentPreview componentName={children[0]} />
          </Box>
        )}
      </PopoverTrigger>
    </Popover>
  )
}

export default PopoverTriggerPreview
