import { DEFAULT_PROPS } from '../../../utils/defaultProps'
import { generateId } from '../app'

class Composer {
  components: IComponents = {}

  rootComponentType: ComponentType | undefined = undefined

  constructor(name?: ComponentType) {
    if (name) {
      this.rootComponentType = name
    }
  }

  addNode = (type: ComponentType, parent: string = 'root'): string => {
    const id = generateId()

    if (parent === 'root' && !this.rootComponentType) {
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
        rootParentType: this.rootComponentType,
      },
    }

    if (parent !== 'root') {
      this.components[parent].children.push(id)
    }

    return id
  }

  getComponents() {
    return this.components
  }
}

export default Composer
