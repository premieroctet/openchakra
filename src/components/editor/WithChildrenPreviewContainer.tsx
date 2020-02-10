import React, { FunctionComponent, ComponentClass } from 'react'
import { useInteractive } from '../../hooks/useInteractive'
import { useDropComponent } from '../../hooks/useDropComponent'
import ComponentPreview from './ComponentPreview'

const WithChildrenPreviewContainer: React.FC<{
  component: IComponent
  type: string | FunctionComponent<any> | ComponentClass<any, any>
  enableVisualHelper?: boolean
}> = ({ component, type, enableVisualHelper = false }) => {
  const { drop, isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, enableVisualHelper)

  if (isOver) {
    props.bg = 'teal.50'
  }

  return React.createElement(
    type,
    { ...props, pos: 'relative', ref: drop(ref) },
    component.children.map((key: string) => (
      <ComponentPreview key={key} componentName={key} />
    )),
  )
}

export default WithChildrenPreviewContainer
