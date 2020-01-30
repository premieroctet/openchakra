import prettier from "prettier/standalone";
import parserTS from "prettier/parser-typescript";

const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const buildBlock = (component: IComponent, components: IComponents) => {
  let content = "";

  component.children.forEach((key: string) => {
    let childComponent = components[key];
    const componentName = capitalize(childComponent.type);
    let propsContent = "";

    const propsNames = Object.keys(childComponent.props);

    propsNames.forEach((propName: string) => {
      if (propName !== "children" && childComponent.props[propName]) {
        propsContent += `${propName}='${childComponent.props[propName]}' `;
      }
    });

    if (
      typeof childComponent.props.children === "string" &&
      childComponent.children.length === 0
    ) {
      content += `<${componentName} ${propsContent}>${childComponent.props.children}</${componentName}>`;
    } else if (childComponent.children.length) {
      content += `<${componentName} ${propsContent}>
      ${buildBlock(childComponent, components)}
      </${componentName}>`;
    } else {
      content += `<${componentName} ${propsContent} />`;
    }
  });

  return content;
};

export const generateCode = (components: IComponents) => {
  let code = buildBlock(components.root, components);

  const imports = [
    ...new Set(
      Object.keys(components)
        .filter(name => name !== "root")
        .map(name => components[name].type)
    )
  ];

  code = `import React from 'react';
import {
  ThemeProvider,
  CSSReset,
  theme,
  ${imports.join(",")}
} from "@chakra-ui/core";

const App = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    ${code}
  </ThemeProvider>
);

export default App;`;

  let formattedCode = `// 🚨 Your props contains invalid code`;

  try {
    formattedCode = prettier.format(code, {
      parser: "typescript",
      plugins: [parserTS]
    });
  } catch (e) {}

  return formattedCode;
};
