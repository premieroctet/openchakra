export type MenuItem = {
  rootParentType?: any
}

type MenuItems = Partial<
  {
    [k in any]: MenuItem
  }
>

export const menuItems: MenuItems = {
  CC: {},
}

export const componentsList: any[] = ['CC']
