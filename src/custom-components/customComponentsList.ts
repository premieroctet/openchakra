export type CMenuItem = {
  children?: CMenuItems
  custom?: boolean
  rootParentType?: ComponentType
}

type CMenuItems = Partial<
  {
    [k in ComponentType]: CMenuItem
  }
>

export const cmenuItems: CMenuItems = {
  CC: { custom: true },
  Sample: {},
}

export const componentsList: ComponentType[] = ['CC', 'Sample']
