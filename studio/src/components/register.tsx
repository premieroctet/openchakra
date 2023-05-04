/**
Entry point to register custom components
ComponentType must still be explicitely added in react-app-env.d.ts and utils/editor.ts
*/
import React from 'react'
import { registerBuilder } from '~core/models/composer/builder'
import { registerComponentMenu, registerComponentType } from '~componentsList'
import { registerDefaultProps } from '~utils/defaultProps'
import { registerPanel } from '~components/inspector/panels/Panels'
import { registerPreview } from '~components/editor/ComponentPreview'
import { BuilderFn } from '~core/models/composer/builder'

type registerParams = {
  componentType: ComponentType
  defaultProps: React.Attributes
  menuChildren: React.ReactChildren
  previewComponent?: React.FC<IPreviewProps>
  isBoxWrapped: boolean
  componentPanel: React.Component
  builderFunction?: BuilderFn
}

export const registerComponent = ({
  componentType,
  defaultProps,
  menuChildren = React.Children ,
  previewComponent,
  isBoxWrapped,
  componentPanel,
  builderFunction,
}: registerParams) => {
  console.log(`Registering custom component ${componentType}`)
  registerComponentType(componentType)
  registerComponentMenu({ componentType, menuChildren })
  previewComponent && registerPreview({ componentType, previewComponent, isBoxWrapped })
  registerPanel({ componentType, componentPanel })
  builderFunction && registerBuilder({ componentType, builderFunction })
  defaultProps && registerDefaultProps({ componentType, defaultProps })
}
