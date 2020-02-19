import React, { FunctionComponent, ComponentClass } from 'react'
import { useInteractive } from '../../hooks/useInteractive'
import { useDropComponent } from '../../hooks/useDropComponent'
import ComponentPreview from './ComponentPreview'
import { Box } from '@chakra-ui/core'

const WithChildrenPreviewContainer: React.FC<{
  component: IComponent
  type: string | FunctionComponent<any> | ComponentClass<any, any>
  enableVisualHelper?: boolean
  isBoxWrapped?: boolean
  masterComponentName?: string
  originalComponent?: IComponent
}> = ({
  component,
  type,
  enableVisualHelper = false,
  isBoxWrapped,
  masterComponentName,
  originalComponent,
  ...forwardedProps
}) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(
    {
      ...component,
      /*
       * We need to provide the id from the components state
       * but the props coming from the user component (if it's a user component)
       */
      id: !!masterComponentName ? originalComponent!.id : component.id,
    },
    enableVisualHelper,
  )
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
      <ComponentPreview
        key={key}
        componentName={key}
        masterComponentName={masterComponentName}
      />
    )),
  )

  if (isBoxWrapped) {
    let boxProps: any = {
      display: 'inline',
    }

    return (
      <Box {...boxProps} ref={drop(ref)}>
        {children}
      </Box>
    )
  }

  return children
}

export default WithChildrenPreviewContainer
