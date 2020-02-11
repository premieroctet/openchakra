import React from 'react'
import { Box, AspectRatioBox } from '@chakra-ui/core'
import { useInteractive } from '../../../hooks/useInteractive'
import { useDropComponent } from '../../../hooks/useDropComponent'
import ComponentPreview from '../ComponentPreview'

const AspectRatioBoxPreview: React.FC<{ component: IComponent }> = ({
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
    <Box {...boxProps} ref={drop(ref)}>
      <AspectRatioBox {...props}>
        {!children.length ? (
          /*
           * We need at least one children because of the implementation
           * of AspectRatioBox
           */
          <Box />
        ) : (
          <Box>
            <ComponentPreview componentName={children[0]} />
          </Box>
        )}
      </AspectRatioBox>
    </Box>
  )
}

export default AspectRatioBoxPreview
