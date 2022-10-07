import { useSelector } from 'react-redux'
import { getCustomComponentNames } from '~core/selectors/customComponents'

export type CMenuItem = {
  children?: CMenuItems
  custom?: boolean
  rootParentType?: ComponentType
}

const CustomComponents = (item = false) => {
  const customComponents = useSelector(getCustomComponentNames)
  let itemizedCustomComponents: any = {}
  if (item) {
    customComponents.forEach((element: string) => {
      itemizedCustomComponents[element] = {}
    })
    return itemizedCustomComponents
  }
  return customComponents
}

type CMenuItems = Partial<
  {
    [k in ComponentType]: CMenuItem
  }
>

export const cmenuItems: CMenuItems = {
  CC: { custom: true },
  Sample: {},
  ...CustomComponents(true),
}

export const componentsList: ComponentType[] = [
  'CC',
  'Sample',
  ...CustomComponents(),
]
