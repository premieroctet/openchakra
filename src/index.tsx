import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import { BuilderProvider } from "./contexts/BuilderContext";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CSSReset />
    <BuilderProvider>
      <App />
    </BuilderProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
