import React, { FunctionComponent, ComponentClass } from 'react'
import { useInteractive } from '../../hooks/useInteractive'
import { Box } from '@chakra-ui/core'

const WithRefSimplePreviewContainer: React.FC<{
  component: IComponent
  type: string | FunctionComponent<any> | ComponentClass<any, any>
  enableVisualHelper?: boolean
}> = ({ component, type, enableVisualHelper }) => {
  const { props, ref } = useInteractive(component, enableVisualHelper)
  let boxProps: any = {}

  return (
    <Box {...boxProps} ref={ref}>
      {React.createElement(type, { ...props })}
    </Box>
  )
}

export default WithRefSimplePreviewContainer
