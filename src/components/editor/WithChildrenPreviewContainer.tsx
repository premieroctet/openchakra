import React, { FunctionComponent, ComponentClass } from 'react'
import { useInteractive } from '../../hooks/useInteractive'
import { useDropComponent } from '../../hooks/useDropComponent'
import { useHoverComponent } from '../../hooks//useHoverComponent'
import ComponentPreview from './ComponentPreview'
import { Box } from '@chakra-ui/core'

const WithChildrenPreviewContainer: React.FC<{
  component: IComponent
  type: string | FunctionComponent<any> | ComponentClass<any, any>
  enableVisualHelper?: boolean
  isBoxWrapped?: boolean
}> = ({
  component,
  type,
  enableVisualHelper = false,
  isBoxWrapped,
  ...forwardedProps
}) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref, boundingPosition } = useInteractive(
    component,
    enableVisualHelper,
    drop,
  )
  const { hover } = useHoverComponent(
    component.id,
    boundingPosition && {
      top: boundingPosition.top,
      bottom: boundingPosition.bottom,
    },
  )

  const hoverRef = hover(ref)
  const propsElement = { ...props, ...forwardedProps, pos: 'relative' }

  if (!isBoxWrapped) {
    propsElement.ref = drop(ref)
  }

  if (isOver) {
    propsElement.bg = 'teal.50'
  }

  const children = React.createElement(
    type,
    propsElement,
    component.children.map((key: string) => (
      <ComponentPreview key={key} componentName={key} />
    )),
  )

  if (isBoxWrapped) {
    let boxProps: any = {
      display: 'inline',
    }
    return (
      <Box {...boxProps} ref={hoverRef}>
        {children}
      </Box>
    )
  }

  return children
}

export default WithChildrenPreviewContainer
