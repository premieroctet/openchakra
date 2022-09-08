import React, { FunctionComponent, ComponentClass } from 'react'
import { useInteractive } from '~hooks/useInteractive'
import { Box } from '@chakra-ui/react'
import { useDropComponent } from '~hooks/useDropComponent'

const PreviewContainer: React.FC<{
  component: IComponent
  type: string | FunctionComponent<any> | ComponentClass<any, any>
  enableVisualHelper?: boolean
  isBoxWrapped?: boolean
  index: number
}> = ({
  component,
  type,
  enableVisualHelper,
  isBoxWrapped,
  index,
  ...forwardedProps
}) => {
  const { props, ref } = useInteractive(component, index, enableVisualHelper)
  const { drop } = useDropComponent(component.id, index, ref)

  const children = React.createElement(type, {
    ...props,
    ...forwardedProps,
    index,
    ref: drop(ref),
  })

  if (isBoxWrapped) {
    let boxProps: any = {}

    return (
      <Box {...boxProps} index={index} ref={drop(ref)}>
        {children}
      </Box>
    )
  }

  return children
}

export default PreviewContainer
