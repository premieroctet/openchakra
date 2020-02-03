import { createModel } from "@rematch/core";
import { INITIAL_COMPONENTS } from "./components";

type Overlay = undefined | { rect: DOMRect; name: string; type: ComponentType };
export type AppState = {
  showLayout: boolean;
  showCode: boolean;
  selectedId: string;
  overlay: undefined | Overlay;
};

const app = createModel({
  state: {
    showLayout: true,
    showCode: false,
    selectedId: INITIAL_COMPONENTS.root.id,
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
    setSelectedId(state: AppState, selectedId: string): AppState {
      return {
        ...state,
        selectedId
      };
    },
    reset(state: AppState): AppState {
      return {
        ...state,
        selectedId: INITIAL_COMPONENTS.root.id
      };
    },
    setOverlay(state: AppState, overlay: Overlay | undefined): AppState {
      return {
        ...state,
        overlay
      };
    }
  }
});

export default app;
