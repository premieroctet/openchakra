export type CMenuItem = {
  children?: CMenuItems
  soon?: boolean
  rootParentType?: ComponentType
}

type CMenuItems = Partial<
  {
    [k in ComponentType]: CMenuItem
  }
>

export const cmenuItems: CMenuItems = {
  CC: {},
}

export const componentsList: ComponentType[] = ['CC']
