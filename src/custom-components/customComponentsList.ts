export type CMenuItem = {
  children?: CMenuItems
  rootParentType?: ComponentType
}

type CMenuItems = Partial<
  {
    [k in CustomComponentType]: CMenuItem
  }
>

export const cmenuItems: CMenuItems = {
  CC: {},
  CC2: {},
}

export const componentsList: CustomComponentType[] = ['CC', 'CC2']
