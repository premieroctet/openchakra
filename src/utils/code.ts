import prettier from "prettier/standalone";
import parserFlow from "prettier/parser-flow";

const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const buildBlock = (component: IComponent, components: IComponents) => {
  let content = "";

  component.children.forEach((key: string) => {
    const componentName = capitalize(components[key].type);
    let propsContent = "";

    const propsKeys = Object.keys(components[key].props);

    propsKeys.forEach((propName: string) => {
      if (propName !== "children") {
        propsContent += `${propName}='${components[key].props[propName]}' `;
      }
    });

    if (
      typeof components[key].props.children === "string" &&
      components[key].children.length === 0
    ) {
      content += `<${componentName} ${propsContent}>${components[key].props.children}</${componentName}>`;
    } else if (components[key].children.length) {
      content += `<${componentName} ${propsContent}>
      ${buildBlock(components[key], components)}
      </${componentName}>`;
    } else {
      content += `<${componentName} ${propsContent} />`;
    }
  });

  return content;
};

export const generateCode = (components: IComponents) => {
  let code = buildBlock(components.root, components);

  code = `import React from 'react';
import {
  ThemeProvider, 
  CSSReset,
  theme,
  Box,
  Avatar,
  AvatarGroup,
  AvatarBadge,
  Button,
  Image,
  Badge,
  Text,
  Icon
} from "@chakra-ui/core";

const App = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    ${code}
  </ThemeProvider>
);

export default App;`;

  return prettier.format(code, {
    parser: "flow",
    plugins: [parserFlow]
  });
};
