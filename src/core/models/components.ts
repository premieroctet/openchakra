import { createModel } from "@rematch/core";
import { DEFAULT_PROPS } from "../../utils/defaultProps";
import omit from "lodash/omit";
import { airbnbCard } from "../../theme/demo";

type ComponentsState = {
  components: IComponents;
};
export type ComponentsStateWithUndo = {
  past: ComponentsState[];
  present: ComponentsState;
  future: ComponentsState[];
};

export const INITIAL_COMPONENTS = {
  root: {
    id: "root",
    parent: "root",
    type: "box" as ComponentType,
    children: [],
    props: {}
  }
};

const components = createModel({
  state: {
    components: INITIAL_COMPONENTS
  } as ComponentsState,
  reducers: {
    reset(state: ComponentsState): ComponentsState {
      return {
        ...state,
        components: INITIAL_COMPONENTS
      };
    },
    loadDemo(state: ComponentsState): ComponentsState {
      return {
        ...state,
        components: airbnbCard as any
      };
    },
    resetProps(state: ComponentsState, componentId: string): ComponentsState {
      const component = state.components[componentId];

      return {
        ...state,
        components: {
          ...state.components,
          [componentId]: {
            ...component,
            props: DEFAULT_PROPS[component.type]
          }
        }
      };
    },
    updateProps(
      state: ComponentsState,
      payload: { id: string; name: string; value: string }
    ) {
      return {
        ...state,
        components: {
          ...state.components,
          [payload.id]: {
            ...state.components[payload.id],
            props: {
              ...state.components[payload.id].props,
              [payload.name]: payload.value
            }
          }
        }
      };
    },
    deleteComponent(state: ComponentsState, componentId: string) {
      let updatedComponents = { ...state.components };
      let component = updatedComponents[componentId];

      if (component && component.parent) {
        const children = updatedComponents[component.parent].children.filter(
          (el: string) => el !== component.id
        );

        updatedComponents[component.parent].children = children;
      }

      updatedComponents = omit(state.components, component.id);

      return {
        ...state,
        components: updatedComponents,
        overlay: undefined,
        selectedComponent: INITIAL_COMPONENTS.root
      };
    },
    moveComponent(
      state: ComponentsState,
      payload: { parentId: string; componentId: string }
    ): ComponentsState {
      if (state.components[payload.componentId].parent === payload.parentId) {
        return state;
      }

      const children = state.components[
        state.components[payload.componentId].parent
      ].children.filter(id => id !== payload.componentId);

      const newChildren = state.components[payload.parentId].children.concat(
        payload.componentId
      );

      return {
        ...state,
        components: {
          ...state.components,
          // Update parent id
          [payload.componentId]: {
            ...state.components[payload.componentId],
            parent: payload.parentId
          },
          // Remove id from legacy children
          [state.components[payload.componentId].parent]: {
            ...state.components[state.components[payload.componentId].parent],
            children
          },
          // Add in new parent children
          [payload.parentId]: {
            ...state.components[payload.parentId],
            children: newChildren
          }
        }
      };
    },
    addComponent(
      state: ComponentsState,
      payload: { parentName: string; type: ComponentType }
    ): ComponentsState {
      const id = `comp-${Math.round(new Date().getTime() / 1000)}`;

      return {
        ...state,
        components: {
          ...state.components,
          [payload.parentName]: {
            ...state.components[payload.parentName],
            children: [...state.components[payload.parentName].children, id]
          },
          [id]: {
            id,
            props: DEFAULT_PROPS[payload.type] || {},
            children: [],
            type: payload.type,
            parent: payload.parentName
          }
        }
      };
    }
  }
});

export default components;
