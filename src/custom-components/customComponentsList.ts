import { useSelector } from 'react-redux'
import { getCustomComponentNames } from '~core/selectors/customComponents'

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
  Sample: {},
}

// Not required as it is only used for checking unique componentName when clicking on 'Name Component' button.
export const componentsList: ComponentType[] = ['Sample']
