import { createModel } from "@rematch/core";

type Overlay = undefined | { rect: DOMRect; name: string; type: ComponentType };
type Selected = undefined | { rect: DOMRect; name: string; };
export type AppState = {
  showLayout: boolean;
  showCode: boolean;
  selected: undefined | Selected;
  overlay: undefined | Overlay;
};

const app = createModel({
  state: {
    showLayout: true,
    showCode: false,
    selected: undefined,
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
        selected,
      };
    },
    reset(state: AppState): AppState {
      return {
        ...state,
        selected: undefined,
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
