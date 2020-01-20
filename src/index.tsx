import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  theme
} from "@chakra-ui/core";
import { BuilderProvider } from "./contexts/BuilderContext";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ColorModeProvider>
      <CSSReset />
      <BuilderProvider>
        <App />
      </BuilderProvider>
    </ColorModeProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
