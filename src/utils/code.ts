import isBoolean from 'lodash/isBoolean'

const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const formatCode = async (code: string) => {
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

const buildBlock = (
  component: IComponent,
  components: IComponents,
  customComponents?: IComponents,
) => {
  let content = ''
  component.children.forEach((key: string) => {
    let childComponent = components[key]
    if (!childComponent) {
      console.error(`invalid component ${key}`)
    } else {
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
        childComponent.customComponentId !== undefined &&
        customComponents !== undefined
      ) {
        const customComponent =
          customComponents[childComponent.customComponentId]
        content += `<${customComponent.name &&
          capitalize(customComponent.name)} />`
      } else if (
        typeof childComponent.props.children === 'string' &&
        childComponent.children.length === 0
      ) {
        content += `<${componentName} ${propsContent}>${childComponent.props.children}</${componentName}>`
      } else if (childComponent.children.length) {
        content += `<${componentName} ${propsContent}>
      ${buildBlock(childComponent, components, customComponents)}
      </${componentName}>`
      } else {
        content += `<${componentName} ${propsContent} />`
      }
    }
  })

  return content
}

export const generateComponentCode = async (
  component: IComponent,
  components: IComponents,
) => {
  let code = buildBlock(component, components)

  code = `
const My${component.type} = () => (
  ${code}
)`

  return await formatCode(code)
}

export const generateCode = async (
  components: IComponents,
  customComponents?: IComponents,
) => {
  let code = buildBlock(components.root, components, customComponents)

  const imports = [
    ...new Set(
      Object.keys(components)
        .filter(name => name !== 'root')
        .map(name => components[name].type),
    ),
  ]
  const customComponentCode =
    customComponents !== undefined &&
    Object.values(customComponents).map(component => {
      const selectedId = component.id
      if (component.name !== undefined) {
        const parentId = customComponents[selectedId].parent
        const parent = { ...customComponents[parentId] }
        parent.children = [selectedId]
        const componentCode = buildBlock(
          parent,
          customComponents,
        )
        return `const ${capitalize(component.name)} = () =>(
        ${componentCode}
     );
     `
      }
    })

  code = `import React from 'react';
import {
  ThemeProvider,
  CSSReset,
  theme,
  ${imports.join(',')}
} from "@chakra-ui/core";

${customComponentCode && customComponentCode.join('')}

const App = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    ${code}
  </ThemeProvider>
);

export default App;
`
  // const App = () => (
  //   <ThemeProvider theme={theme}>
  //     <CSSReset />
  //     ${code}
  //   </ThemeProvider>
  // );

  // export default App;

  return await formatCode(code)
}
