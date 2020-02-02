import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppStateWithUndo } from "./core/models/app";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import { init } from "@rematch/core";
import createRematchPersist from "@rematch/persist";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import undoable from "redux-undo";

import models from "./core/models";
import filterUndoableActions from "./utils/undo";

export type RootState = {
  app: AppStateWithUndo;
};

const persistPlugin = createRematchPersist({
  whitelist: ["app"],
  version: parseInt(process.env.REACT_APP_VERSION || "1", 10)
});

export const store = init({
  models,
  redux: {
    combineReducers: reducers => {
      console.log(reducers);
      return combineReducers({
        ...reducers,
        app: undoable(reducers.app, {
          filter: filterUndoableActions,
        })
      });
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
