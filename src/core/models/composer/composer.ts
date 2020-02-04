import { DEFAULT_PROPS } from "../../../utils/defaultProps";
import { generateId } from "../app";

class Composer {
  components: IComponents = {};

  addNode = (type: ComponentType, parent: string = "root"): string => {
    const id = generateId();

    this.components = {
      ...this.components,
      [id]: {
        children: [],
        type,
        parent,
        id,
        props: DEFAULT_PROPS[type] || {}
      }
    };

    if (parent !== "root") {
      this.components[parent].children.push(id);
    }

    return id;
  };

  getComponents() {
    return this.components;
  }
}

export default Composer;
