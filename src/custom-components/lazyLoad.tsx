import { lazy } from 'react'
import { convertToPascal } from '~components/editor/Editor'

const importView = (component: any, isPreview: boolean) => {
  component = convertToPascal(component)
  return lazy(() =>
    import(
      `${
        isPreview
          ? `src/custom-components/editor/previews/${component}Preview.oc.tsx`
          : `src/custom-components/inspector/panels/components/${component}Panel.oc.tsx`
      }`
    ).catch(() => import('src/custom-components/fallback')),
  )
}

export default async function loadViews(
  customComponents: Array<string>,
  component: IComponent,
  isPreview: boolean,
): Promise<any> {
  return await customComponents.map(async (customComponent: string) => {
    const View = await importView(customComponent, isPreview)
    return <View key={customComponent} component={component} />
  })
}
