import React, { FunctionComponent, ComponentClass } from 'react'
import { useInteractive } from '../../hooks/useInteractive'

const PreviewContainer: React.FC<{
  component: IComponent
  type: string | FunctionComponent<any> | ComponentClass<any, any>
}> = ({ component, type }) => {
  const { props, ref } = useInteractive(component)

  return React.createElement(type, { ...props, ref })
}

export default PreviewContainer
