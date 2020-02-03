import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import { init, RematchRootState } from "@rematch/core";
import createRematchPersist from "@rematch/persist";
import models from "./core/models";
import { Provider } from "react-redux";

export type RootState = RematchRootState<typeof models>;

const persistPlugin = createRematchPersist({
  whitelist: ["app"],
  version: parseInt(process.env.REACT_APP_VERSION || "1", 10)
});

export const store = init({
  models,
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
