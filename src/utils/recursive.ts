import omit from 'lodash/omit'
import { generateId } from './generateId'

export const duplicateComponent = (
  componentToClone: IComponent,
  components: IComponents,
  additionalChildrenData: { [k in keyof IComponent]?: IComponent[k] } = {},
) => {
  const clonedComponents: IComponents = {}

  const cloneComponent = (component: IComponent) => {
    const newid = generateId()
    const children = component.children.map(child => {
      return cloneComponent(components[child])
    })

    clonedComponents[newid] = {
      ...component,
      ...additionalChildrenData,
      id: newid,
      props: { ...component.props },
      children,
      originId: component.id,
    }

    children.forEach(child => {
      clonedComponents[child].parent = newid
    })

    return newid
  }

  const newId = cloneComponent(componentToClone)

  return {
    newId,
    clonedComponents,
  }
}

export const deleteComponent = (
  component: IComponent,
  components: IComponents,
) => {
  let updatedComponents = { ...components }
  const deleteRecursive = (
    children: IComponent['children'],
    id: IComponent['id'],
  ) => {
    children.forEach(child => {
      updatedComponents[child] &&
        deleteRecursive(updatedComponents[child].children, child)
    })

    updatedComponents = omit(updatedComponents, id)
  }

  deleteRecursive(component.children, component.id)
  updatedComponents = omit(updatedComponents, component.id)
  return updatedComponents
}

export const flattenComponent = (
  component: IComponent,
  components: IComponents,
  withInitialComponent?: boolean,
) => {
  let flattenedComponents: IComponents = {}

  if (withInitialComponent) {
    flattenedComponents[component.id] = {
      ...component,
    }
  }

  const flatRecursive = (children: IComponent['children']) => {
    children.forEach(child => {
      flatRecursive(components[child].children)
      flattenedComponents[child] = components[child]
    })
  }

  flatRecursive(component.children)

  return flattenedComponents
}
