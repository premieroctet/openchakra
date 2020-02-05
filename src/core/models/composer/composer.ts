import { DEFAULT_PROPS } from '../../../utils/defaultProps'
import { generateId } from '../app'

class Composer {
  components: IComponents = {}

  rootComponentType: ComponentType | undefined = undefined

  addNode = (type: ComponentType, parent: string = 'root'): string => {
    const id = generateId()

    if (parent === 'root') {
      this.rootComponentType = type
    }

    this.components = {
      ...this.components,
      [id]: {
        children: [],
        type,
        parent,
        id,
        props: DEFAULT_PROPS[type] || {},
      },
    }

    if (parent !== 'root') {
      this.components[parent].children.push(id)
      this.components[id].rootParentType = this.rootComponentType
    }

    return id
  }

  getComponents() {
    return this.components
  }
}

export default Composer
