import omit from 'lodash/omit'
import filter from 'lodash/filter'
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

    let newComponentName = component.componentName
    if (newComponentName) {
      const matches = /^([a-zA-Z]*)(\d+)?$/g.exec(newComponentName)
      // Get all components with a similar name (same base component name + number suffix)
      const similarComponents = filter(
        components,
        comp => !!comp.componentName?.includes(matches![1]),
      )
      let highestNumber = 0
      // Get the highest suffix number
      similarComponents.forEach(comp => {
        const nameMatches = /^([a-zA-Z]*)(\d+)?$/g.exec(comp.componentName!)
        const number = nameMatches?.length === 2 ? 0 : Number(nameMatches![2])

        if (number > highestNumber) {
          highestNumber = number
        }
      })
      // Use the suffix number + 1 to name our duplicated component
      newComponentName = newComponentName.replace(
        /^([a-zA-Z]*)(\d+)?$/g,
        `$1${highestNumber + 1}`,
      )
    }

    clonedComponents[newid] = {
      ...component,
      id: newid,
      props: { ...component.props },
      children,
      componentName: newComponentName,
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
