import { createModel } from "@rematch/core";

type Overlay = undefined | { rect: DOMRect; id: string; type: ComponentType };
type Selected = { rect?: DOMRect; id: string };

export type AppState = {
  showLayout: boolean;
  showCode: boolean;
  selected: Selected;
  overlay: undefined | Overlay;
};

const DEFAULT_SELECTED = { id: "root" };

export const generateId = () => {
  return `comp-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
};

const app = createModel({
  state: {
    showLayout: true,
    showCode: false,
    selected: DEFAULT_SELECTED,
    overlay: undefined
  } as AppState,
  reducers: {
    toggleBuilderMode(state: AppState): AppState {
      return {
        ...state,
        showLayout: !state.showLayout
      };
    },
    toggleCodePanel(state: AppState): AppState {
      return {
        ...state,
        showCode: !state.showCode
      };
    },
    select(state: AppState, selected: Selected): AppState {
      return {
        ...state,
        selected
      };
    },
    setOverlay(state: AppState, overlay: Overlay | undefined): AppState {
      return {
        ...state,
        overlay
      };
    },
    "components/deleteComponent": (state: AppState): AppState => {
      return {
        ...state,
        selected: DEFAULT_SELECTED,
        overlay: undefined
      };
    },
    "components/reset": (state: AppState): AppState => {
      return {
        ...state,
        selected: DEFAULT_SELECTED
      };
    }
  }
});

export default app;
