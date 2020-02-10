import isBoolean from 'lodash/isBoolean'

const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const buildBlock = (component: IComponent, components: IComponents) => {
  let content = ''

  component.children.forEach((key: string) => {
    let childComponent = components[key]
    const componentName = capitalize(childComponent.type)
    let propsContent = ''

    const propsNames = Object.keys(childComponent.props)

    propsNames.forEach((propName: string) => {
      const propsValue = childComponent.props[propName]

      if (propName !== 'children' && propsValue) {
        let operand = `='${propsValue}'`

        if (propsValue === true || propsValue === 'true') {
          operand = ``
        } else if (
          propsValue === 'false' ||
          isBoolean(propsValue) ||
          !isNaN(propsValue)
        ) {
          operand = `={${propsValue}}`
        }

        propsContent += `${propName}${operand} `
      }
    })

    if (
      typeof childComponent.props.children === 'string' &&
      childComponent.children.length === 0
    ) {
      content += `<${componentName} ${propsContent}>${childComponent.props.children}</${componentName}>`
    } else if (childComponent.children.length) {
      content += `<${componentName} ${propsContent}>
      ${buildBlock(childComponent, components)}
      </${componentName}>`
    } else {
      content += `<${componentName} ${propsContent} />`
    }
  })

  return content
}

export const generateCode = async (components: IComponents) => {
  let code = buildBlock(components.root, components)

  const imports = [
    ...new Set(
      Object.keys(components)
        .filter(name => name !== 'root')
        .map(name => components[name].type),
    ),
  ]

  code = `import React from 'react';
import {
  ThemeProvider,
  CSSReset,
  theme,
  ${imports.join(',')}
} from "@chakra-ui/core";

const App = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    ${code}
  </ThemeProvider>
);

export default App;`

  let formattedCode = `// 🚨 Your props contains invalid code`

  const prettier = await import('prettier/standalone')
  const babylonParser = await import('prettier/parser-babylon')

  try {
    formattedCode = prettier.format(code, {
      parser: 'babel',
      plugins: [babylonParser],
      semi: false,
      singleQuote: true,
    })
  } catch (e) {}

  return formattedCode
}
