import omit from 'lodash/omit'
import { generateId } from './generateId'

export const duplicateComponent = (
  componentToClone: IComponent,
  components: IComponents,
) => {
  const clonedComponents: IComponents = {}

  const cloneComponent = (component: IComponent) => {
    const newid = generateId()
    const children = component.children.map(child => {
      return cloneComponent(components[child])
    })

    clonedComponents[newid] = {
      ...component,
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
export const saveComponents = (
  component: IComponent,
  components: IComponents,
  name: string,
) => {
  let savedComponents: IComponents = {}

  const save = (component: IComponent, name?: string) => {
    savedComponents = {
      ...savedComponents,
      [component.id]: {
        ...component,
        name,
      },
    }
    component.children &&
      component.children.forEach(child => {
        const newComponentToSave = components[child]
        save(newComponentToSave)
      })
  }
  save(component, name)
  return savedComponents
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
