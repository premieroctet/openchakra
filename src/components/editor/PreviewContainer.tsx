import React, { FunctionComponent, ComponentClass } from 'react'
import { useInteractive } from '../../hooks/useInteractive'
import { useHoverComponent } from '../../hooks/useHoverComponent'
import { Box } from '@chakra-ui/core'

const PreviewContainer: React.FC<{
  component: IComponent
  type: string | FunctionComponent<any> | ComponentClass<any, any>
  enableVisualHelper?: boolean
  isBoxWrapped?: boolean
}> = ({
  component,
  type,
  enableVisualHelper,
  isBoxWrapped,
  ...forwardedProps
}) => {
  const { props, ref, boundingPosition } = useInteractive(
    component,
    enableVisualHelper,
  )
  const { hover } = useHoverComponent(
    component.id,
    boundingPosition && {
      top: boundingPosition.top,
      bottom: boundingPosition.bottom,
    },
  )

  const hoverRef = hover(ref)
  const children = React.createElement(type, {
    ...props,
    ...forwardedProps,
    ref,
  })

  if (isBoxWrapped) {
    let boxProps: any = {}

    return (
      <Box {...boxProps} ref={hoverRef}>
        {children}
      </Box>
    )
  }

  return children
}

export default PreviewContainer
