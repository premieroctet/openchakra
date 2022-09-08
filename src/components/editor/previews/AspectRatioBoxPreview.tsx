import React from 'react'
import { Box, AspectRatio } from '@chakra-ui/react'
import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import ComponentPreview from '~components/editor/ComponentPreview'

const AspectRatioPreview: React.FC<IPreviewProps> = ({ component, index }) => {
  const { props, ref } = useInteractive(component, index, true)
  const { drop, isOver } = useDropComponent(
    component.id,
    index,
    ref,
    undefined,
    component.children.length === 0,
  )
  const children = component.children

  const boxProps: any = {}

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <Box {...boxProps} index={index} ref={drop(ref)}>
      <AspectRatio {...props}>
        {!children.length ? (
          /*
           * We need at least one children because of the implementation
           * of AspectRatio
           */
          <Box />
        ) : (
          <Box>
            <ComponentPreview index={0} componentName={children[0]} />
          </Box>
        )}
      </AspectRatio>
    </Box>
  )
}

export default AspectRatioPreview
