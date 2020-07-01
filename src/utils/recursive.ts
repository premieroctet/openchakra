import omit from 'lodash/omit'
import each from 'lodash/each'
import { generateId } from './generateId'

export const duplicateComponent = (
  componentToClone: IComponent,
  components: IComponents,
  removeUserComponentDatas: boolean = false,
) => {
  const clonedComponents: IComponents = {}

  const cloneComponent = (component: IComponent) => {
    const newid = generateId()
    const children = component.children.map(child => {
      return cloneComponent(components[child])
    })

    clonedComponents[newid] = {
      ...component,
      instanceOf: removeUserComponentDatas ? undefined : component.instanceOf,
      userComponentName: removeUserComponentDatas
        ? undefined
        : component.userComponentName,
      id: newid,
      props: { ...component.props },
      children,
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

  if (component.instanceOf) {
    each(updatedComponents, comp => {
      if (comp.parent === component.id && component.instanceOf) {
        comp.parent = component.instanceOf
      }
    })
  }

  // Remove self
  if (component && component.parent) {
    let parent = updatedComponents[component.parent]

    if (parent.instanceOf) {
      parent = updatedComponents[parent.instanceOf]
    }

    const children = parent.children.filter((id: string) => id !== component.id)

    parent.children = children
  }

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

export const getComponentParents = (
  component: IComponent,
  components: IComponents,
) => {
  let currentComponentId = component.id
  const parents: string[] = []

  while (currentComponentId !== 'root') {
    const parent = components[currentComponentId].parent
    parents.push(parent)
    currentComponentId = parent
  }

  return parents
}

export const detachUserComponent = (
  componentToDetach: IComponent,
  components: IComponents,
) => {
  const masterComponent = components[componentToDetach.instanceOf!]
  const parentElement = components[componentToDetach.parent]
  const detachedId = componentToDetach.id
  const { newId, clonedComponents } = duplicateComponent(
    masterComponent,
    components,
    true,
  )
  masterComponent.children.forEach(child => {
    components[child].parent = masterComponent.id
  })
  // debugger
  components = {
    ...components,
    ...clonedComponents,
  }
  components = omit(components, detachedId)
  const childIdx = components[parentElement.id].children.findIndex(
    child => child === detachedId,
  )
  components[parentElement.id].children[childIdx] = newId

  return { newId, components }
}
