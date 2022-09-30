export type CustomComponentType =
  | 'CC'
  | 'CC2'
  | 'CCItem'
  | 'CCButton'
  | 'CCPanel'
  | 'CCIcon'

export interface CComponent {
  children: string[]
  type: CustomComponentType
  parent: string
  id: string
  props: any
  rootParentType?: CustomComponentType
  componentName?: string
}

export interface CComponents {
  [name: string]: CComponent
}

export interface CPreviewProps {
  component: CComponent
}

export interface CustomComponentItemProps {
  id: string
  label: string
  type: CustomComponentType
  isMoved?: boolean
  isChild?: boolean
  isMeta?: boolean
  soon?: boolean
  rootParentType?: CustomComponentType
  children?: React.ReactNode
}
