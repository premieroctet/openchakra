import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppStateWithUndo } from "./core/models/app";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import undoable from "redux-undo";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import models from "./core/models";
import filterUndoableActions from "./utils/undo";

export type RootState = {
  app: AppStateWithUndo;
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["app"],
  version: parseInt(process.env.REACT_APP_VERSION || "1", 10),
  stateReconciler: (inboundState: RootState) => {
    return inboundState;
  }
};

const persistPlugin = {
  onStoreCreated(store: any) {
    persistStore(store);
  }
};

export const store = init({
  models,
  redux: {
    combineReducers: reducers => {
      return persistReducer(
        persistConfig,
        combineReducers({
          ...reducers,
          app: undoable(reducers.app, {
            filter: filterUndoableActions
          })
        })
      );
    }
  },
  plugins: [persistPlugin]
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <App />
    </ThemeProvider>
  </Provider>,

  document.getElementById("root")
);
