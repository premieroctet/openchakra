export type CMenuItem = {
  children?: CMenuItems
  rootParentType?: ComponentType
}

type CMenuItems = Partial<
  {
    [k in ComponentType]: CMenuItem
  }
>

export const cmenuItems: CMenuItems = {
  CC: {},
  CC2: {},
}

export const componentsList: ComponentType[] = ['CC', 'CC2']
