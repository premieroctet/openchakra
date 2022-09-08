import React, { FunctionComponent, ComponentClass } from 'react'
import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import ComponentPreview from '~components/editor/ComponentPreview'
import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { getIsSortHovered } from '~core/selectors/components'

const WithChildrenPreviewContainer: React.FC<{
  component: IComponent
  type: string | FunctionComponent<any> | ComponentClass<any, any>
  enableVisualHelper?: boolean
  isBoxWrapped?: boolean
  index: number
}> = ({
  component,
  type,
  enableVisualHelper = false,
  isBoxWrapped,
  index,
  ...forwardedProps
}) => {
  const { props, ref } = useInteractive(component, index, enableVisualHelper)
  const { drop, isOver } = useDropComponent(component.id, index, ref)
  const propsElement = { ...props, ...forwardedProps, pos: 'relative' }
  const isSortHovered = useSelector(getIsSortHovered(component.id))

  if (!isBoxWrapped) {
    propsElement.ref = drop(ref)
  }

  if (isOver && !isSortHovered) {
    propsElement.bg = 'teal.50'
  }

  const children = React.createElement(
    type,
    propsElement,
    component.children.map((key, childIndex) => (
      <ComponentPreview key={key} index={childIndex} componentName={key} />
    )),
  )

  if (isBoxWrapped) {
    let boxProps: any = {
      display: 'inline',
    }

    return (
      <Box {...boxProps} key={index} index={index} ref={drop(ref)}>
        {children}
      </Box>
    )
  }

  return children
}

export default WithChildrenPreviewContainer
